<%
'  For examples, documentation, and your own free copy, go to:
'  http://www.freeaspupload.net
'  Note: You can copy and use this script for free and you can make changes
'  to the code, but you cannot remove the above comment.

'Changes:
'Aug 2, 2005: Add support for checkboxes and other input elements with multiple values
Dim reason, errorstring, userID, theFile, isDiff, strBuff

Class FreeASPUpload
	Dim objFSO
	Dim fl1
	Dim w, h, c, strType, del

	Public UploadedFiles
	Public FormElements

	Private VarArrayBinRequest
	Private StreamRequest
	Private uploadedYet

	Private Sub Class_Initialize()
		Set UploadedFiles = Server.CreateObject("Scripting.Dictionary")
		Set FormElements = Server.CreateObject("Scripting.Dictionary")
		Set StreamRequest = Server.CreateObject("ADODB.Stream")
		StreamRequest.Type = 1 'adTypeBinary
		StreamRequest.Open
		uploadedYet = false
	End Sub
	
	Private Sub Class_Terminate()
		If IsObject(UploadedFiles) Then
			UploadedFiles.RemoveAll()
			Set UploadedFiles = Nothing
		End If
		If IsObject(FormElements) Then
			FormElements.RemoveAll()
			Set FormElements = Nothing
		End If
		StreamRequest.Close
		Set StreamRequest = Nothing
	End Sub

	Public Property Get Form(sIndex)
		Form = ""
		If FormElements.Exists(LCase(sIndex)) Then Form = FormElements.Item(LCase(sIndex))
	End Property

	Public Property Get Files()
		Files = UploadedFiles.Items
	End Property

	'Calls Upload to extract the data from the binary request and then saves the uploaded files
	Public Sub Save(path)
		Dim streamFile, fileItem

		if Right(path, 1) <> "\" then path = path & "\"

		if not uploadedYet then Upload
		
		For Each fileItem In UploadedFiles.Items
			If checkFiles(fileItem) Then
				errorstring= reason
			Else
				Set streamFile = Server.CreateObject("ADODB.Stream")
				streamFile.Type = 1
				streamFile.Open
				StreamRequest.Position=fileItem.Start
				StreamRequest.CopyTo streamFile, fileItem.Length
				streamFile.SaveToFile path & userID & "_" & fileItem.FileName, 2
				streamFile.close
				Set streamFile = Nothing
				fileItem.Path = path & userID & "_" & fileItem.FileName
				del=0
				Set objFSO = CreateObject("Scripting.FileSystemObject")
				If avatars Then
					Set fl1 = objFSO.GetFile(fileItem.Path)
					If gfxSpex(fl1.Path, w, h, c, strType) = true Then
          					If w>MAX_WIDTH Then
							errorstring="<br><b>Maximum allowed width of avatars is " & MAX_WIDTH & "px! Please Try again.</b><br>"
							del=1
						Else
							If h>MAX_HEIGHT Then
								errorstring="<br><b>Maximum allowed height of avatars is " & MAX_WIDTH & "px! Please Try again.</b><br>"
								del=1
							End If
						End If
     					Else
       				   		errorstring="<br><b>Not a valid file type! Please Try again.</b><br>"
						del=1
       					End If
				End If
				If del=1 Then
					'If objFSO.FileExists(fl1.Path) then			
  						objFSO.DeleteFile(fl1.Path)
					'End If
				Else
					theFile=userID & "_" & fileItem.FileName
					errorstring=""
				End If
			End If
			Exit For
		Next
	End Sub

	Function checkFiles(fileItem)
		Dim count, MyPath, MyFileSize, MyFolder
		reason=""
		Set MyFileSize = Server.CreateObject ("Scripting.FileSystemObject")
		MyPath = Server.MapPath("images")
		Set MyFolder = MyFileSize.GetFolder(MyPath)
		If MyFolder.Size > MAX_DIR_SIZE Then
			reason="<br><b>The image file repository is full! Please Try again.</b><br>"
		End If
		If instr(1,fileItem.FileName,"[[")=0 and instr(1,fileItem.FileName,"]]")=0 Then
			checkFiles=0
		Else
			reason="<br><b>Image file names cannot contain the following: [[ , ]] Please Try again.</b><br>"
		End If
		If fileItem.ContentType="image/gif" or fileItem.ContentType="image/pjpeg" or fileItem.ContentType="image/jpeg" or fileItem.ContentType="image/jpg" Then
			checkFiles=0
		Else
			reason="<br><b>Bad Filetype! Please Try again.</b><br>"
		End If
		If (fileItem.Length)>MAX_FILE_SIZE Then
			reason="<br><b>You have exceeded the size limit for image files! Please Try again.</b><br>"
		End If
		userID=Request.queryString("ID")
		if(userID="" Or Not isNumeric(userID)) Then
			reason="<br><b>Invalid User! Please Try again.</b><br>"
		End If
		If reason="" Then
			checkFiles=0
		Else
			checkFiles=1
		End If
	End Function

	Public Function SaveBinRequest(path) ' For debugging purposes
		StreamRequest.SaveToFile path & "\debugStream.bin", 2
	End Function

	Public Sub DumpData() 'only works if files are plain text
		Dim i, aKeys, f
		response.write "Form Items:<br>"
		aKeys = FormElements.Keys
		For i = 0 To FormElements.Count -1 ' Iterate the array
			response.write aKeys(i) & " = " & FormElements.Item(aKeys(i)) & "<BR>"
		Next
		response.write "Uploaded Files:<br>"
		For Each f In UploadedFiles.Items
			response.write "Name: " & f.FileName & "<br>"
			response.write "Type: " & f.ContentType & "<br>"
			response.write "Start: " & f.Start & "<br>"
			response.write "Size: " & f.Length & "<br>"
		 Next
   	End Sub

	Private Sub Upload()
		Dim nCurPos, nDataBoundPos, nLastSepPos
		Dim nPosFile, nPosBound
		Dim sFieldName, osPathSep, auxStr

		'RFC1867 Tokens
		Dim vDataSep
		Dim tNewLine, tDoubleQuotes, tTerm, tFilename, tName, tContentDisp, tContentType
		tNewLine = Byte2String(Chr(13))
		tDoubleQuotes = Byte2String(Chr(34))
		tTerm = Byte2String("--")
		tFilename = Byte2String("filename=""")
		tName = Byte2String("name=""")
		tContentDisp = Byte2String("Content-Disposition")
		tContentType = Byte2String("Content-Type:")

		uploadedYet = true

		on error resume next
		VarArrayBinRequest = Request.BinaryRead(Request.TotalBytes)
		if Err.Number <> 0 then 
			response.write "<br><br><B>System reported this error:</B><p>"
			response.write Err.Description & "<p>"
			response.write "The most likely cause for this error is the incorrect setup of AspMaxRequestEntityAllowed in IIS MetaBase. Please see instructions in the <A HREF='http://www.freeaspupload.net/freeaspupload/requirements.asp'>requirements page of freeaspupload.net</A>.<p>"
			Exit Sub
		end if
		on error goto 0 'reset error handling

		nCurPos = FindToken(tNewLine,1) 'Note: nCurPos is 1-based (and so is InstrB, MidB, etc)

		If nCurPos <= 1  Then Exit Sub
		 
		'vDataSep is a separator like -----------------------------21763138716045
		vDataSep = MidB(VarArrayBinRequest, 1, nCurPos-1)

		'Start of current separator
		nDataBoundPos = 1

		'Beginning of last line
		nLastSepPos = FindToken(vDataSep & tTerm, 1)

		Do Until nDataBoundPos = nLastSepPos
			
			nCurPos = SkipToken(tContentDisp, nDataBoundPos)
			nCurPos = SkipToken(tName, nCurPos)
			sFieldName = ExtractField(tDoubleQuotes, nCurPos)

			nPosFile = FindToken(tFilename, nCurPos)
			nPosBound = FindToken(vDataSep, nCurPos)
			
			If nPosFile <> 0 And  nPosFile < nPosBound Then
				Dim oUploadFile
				Set oUploadFile = New UploadedFile
				
				nCurPos = SkipToken(tFilename, nCurPos)
				auxStr = ExtractField(tDoubleQuotes, nCurPos)
                ' We are interested only in the name of the file, not the whole path
                ' Path separator is \ in windows, / in UNIX
                ' While IE seems to put the whole pathname in the stream, Mozilla seem to 
                ' only put the actual file name, so UNIX paths may be rare. But not impossible.
                osPathSep = "\"
                if InStr(auxStr, osPathSep) = 0 then osPathSep = "/"
				oUploadFile.FileName = Right(auxStr, Len(auxStr)-InStrRev(auxStr, osPathSep))

				if (Len(oUploadFile.FileName) > 0) then 'File field not left empty
					nCurPos = SkipToken(tContentType, nCurPos)
					
                    auxStr = ExtractField(tNewLine, nCurPos)
                    ' NN on UNIX puts things like this in the streaa:
                    '    ?? python py type=?? python application/x-python
					oUploadFile.ContentType = Right(auxStr, Len(auxStr)-InStrRev(auxStr, " "))
					nCurPos = FindToken(tNewLine, nCurPos) + 4 'skip empty line
					
					oUploadFile.Start = nCurPos-1
					oUploadFile.Length = FindToken(vDataSep, nCurPos) - 2 - nCurPos
					
					If oUploadFile.Length > 0 Then UploadedFiles.Add LCase(sFieldName), oUploadFile
				End If
			Else
				Dim nEndOfData
				nCurPos = FindToken(tNewLine, nCurPos) + 4 'skip empty line
				nEndOfData = FindToken(vDataSep, nCurPos) - 2
				If Not FormElements.Exists(LCase(sFieldName)) Then 
					FormElements.Add LCase(sFieldName), String2Byte(MidB(VarArrayBinRequest, nCurPos, nEndOfData-nCurPos))
				else
                    FormElements.Item(LCase(sFieldName))= FormElements.Item(LCase(sFieldName)) & ", " & String2Byte(MidB(VarArrayBinRequest, nCurPos, nEndOfData-nCurPos)) 
                end if 

			End If

			'Advance to next separator
			nDataBoundPos = FindToken(vDataSep, nCurPos)
		Loop
		StreamRequest.Write(VarArrayBinRequest)
	End Sub

	Private Function SkipToken(sToken, nStart)
		SkipToken = InstrB(nStart, VarArrayBinRequest, sToken)
		If SkipToken = 0 then
			Response.write "Error in parsing uploaded binary request."
			Response.End
		end if
		SkipToken = SkipToken + LenB(sToken)
	End Function

	Private Function FindToken(sToken, nStart)
		FindToken = InstrB(nStart, VarArrayBinRequest, sToken)
	End Function

	Private Function ExtractField(sToken, nStart)
		Dim nEnd
		nEnd = InstrB(nStart, VarArrayBinRequest, sToken)
		If nEnd = 0 then
			Response.write "Error in parsing uploaded binary request."
			Response.End
		end if
		ExtractField = String2Byte(MidB(VarArrayBinRequest, nStart, nEnd-nStart))
	End Function

	'String to byte string conversion
	Private Function Byte2String(sString)
		Dim i
		For i = 1 to Len(sString)
		   Byte2String = Byte2String & ChrB(AscB(Mid(sString,i,1)))
		Next
	End Function

	'Byte string to string conversion
	Private Function String2Byte(bsString)
		Dim i
		String2Byte =""
		For i = 1 to LenB(bsString)
		   String2Byte = String2Byte & Chr(AscB(MidB(bsString,i,1))) 
		Next
	End Function
End Class

Class UploadedFile
	Public ContentType
	Public Start
	Public Length
	Public Path
	Private nameOfFile

    ' Need to remove characters that are valid in UNIX, but not in Windows
    Public Property Let FileName(fN)
        nameOfFile = fN
        nameOfFile = SubstNoReg(nameOfFile, "\", "_")
        nameOfFile = SubstNoReg(nameOfFile, "/", "_")
        nameOfFile = SubstNoReg(nameOfFile, ":", "_")
        nameOfFile = SubstNoReg(nameOfFile, "*", "_")
        nameOfFile = SubstNoReg(nameOfFile, "?", "_")
        nameOfFile = SubstNoReg(nameOfFile, """", "_")
        nameOfFile = SubstNoReg(nameOfFile, "<", "_")
        nameOfFile = SubstNoReg(nameOfFile, ">", "_")
        nameOfFile = SubstNoReg(nameOfFile, "|", "_")
    End Property

    Public Property Get FileName()
        FileName = nameOfFile
    End Property

    'Public Property Get FileN()ame
End Class


' Does not depend on RegEx, which is not available on older VBScript
' Is not recursive, which means it will not run out of stack space
Function SubstNoReg(initialStr, oldStr, newStr)
    Dim currentPos, oldStrPos, skip
    If IsNull(initialStr) Or Len(initialStr) = 0 Then
        SubstNoReg = ""
    ElseIf IsNull(oldStr) Or Len(oldStr) = 0 Then
        SubstNoReg = initialStr
    Else
        If IsNull(newStr) Then newStr = ""
        currentPos = 1
        oldStrPos = 0
        SubstNoReg = ""
        skip = Len(oldStr)
        Do While currentPos <= Len(initialStr)
            oldStrPos = InStr(currentPos, initialStr, oldStr)
            If oldStrPos = 0 Then
                SubstNoReg = SubstNoReg & Mid(initialStr, currentPos, Len(initialStr) - currentPos + 1)
                currentPos = Len(initialStr) + 1
            Else
                SubstNoReg = SubstNoReg & Mid(initialStr, currentPos, oldStrPos - currentPos) & newStr
                currentPos = oldStrPos + skip
            End If
        Loop
    End If
End Function

function GetBytes(flnm, offset, bytes)
     Dim objFSO
     Dim objFTemp
     Dim objTextStream
     Dim lngSize
     Dim fsoForReading
     on error resume next
     Set objFSO = CreateObject("Scripting.FileSystemObject")
     ' First, we get the filesize
     Set objFTemp = objFSO.GetFile(flnm)
    
     lngSize = objFTemp.Size
     set objFTemp = nothing
     fsoForReading = 1
     Set objTextStream = objFSO.OpenTextFile(flnm, fsoForReading)
     if offset > 0 then
        strBuff = objTextStream.Read(offset - 1)
     end if
     if bytes = -1 then		' Get All!

        GetBytes = objTextStream.Read(lngSize)  'ReadAll

     else
        GetBytes = objTextStream.Read(bytes)
     end if

     objTextStream.Close
     set objTextStream = nothing
     set objFSO = nothing

  end function


  ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ':::                                                             :::
  ':::  Functions to convert two bytes to a numeric value (long)   :::
  ':::  (both little-endian and big-endian)                        :::
  ':::                                                             :::
  ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  function lngConvert(strTemp)
     lngConvert = clng(asc(left(strTemp, 1)) + ((asc(right(strTemp, 1)) * 256)))
  end function

  function lngConvert2(strTemp)
     lngConvert2 = clng(asc(right(strTemp, 1)) + ((asc(left(strTemp, 1)) * 256)))
  end function

':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ':::                                                             :::
  ':::  This function does most of the real work. It will attempt  :::
  ':::  to read any file, regardless of the extension, and will    :::
  ':::  identify if it is a graphical image.                       :::
  ':::                                                             :::
  ':::  Passed:                                                    :::
  ':::       flnm        => Filespec of file to read               :::
  ':::       width       => width of image                         :::
  ':::       height      => height of image                        :::
  ':::       depth       => color depth (in number of colors)      :::
  ':::       strImageType=> type of image (e.g. GIF, BMP, etc.)    :::
  ':::                                                             :::
  ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  function gfxSpex(flnm, width, height, depth, strImageType)

     dim strPNG 
     dim strGIF
     dim strBMP
     dim strType
     dim lngSize
     dim flgFound
     dim strTarget
     dim lngPos
     dim lngMarkerSize
     dim ExitLoop

     strType = ""
     strImageType = "(unknown)"

     gfxSpex = False

     strPNG = chr(137) & chr(80) & chr(78)
     strGIF = "GIF"
     strBMP = chr(66) & chr(77)
     strType = GetBytes(flnm, 0, 3)
	'response.write strType
     if strType = strGIF then				' is GIF
        strImageType = "GIF"
        Width = lngConvert(GetBytes(flnm, 7, 2))
        Height = lngConvert(GetBytes(flnm, 9, 2))
        Depth = 2 ^ ((asc(GetBytes(flnm, 11, 1)) and 7) + 1)
        gfxSpex = True

     elseif left(strType, 2) = strBMP then		' is BMP

        strImageType = "BMP"
        Width = lngConvert(GetBytes(flnm, 19, 2))
        Height = lngConvert(GetBytes(flnm, 23, 2))
        Depth = 2 ^ (asc(GetBytes(flnm, 29, 1)))
        gfxSpex = True

     elseif strType = strPNG then			' Is PNG

        strImageType = "PNG"
        Width = lngConvert2(GetBytes(flnm, 19, 2))
        Height = lngConvert2(GetBytes(flnm, 23, 2))
        Depth = getBytes(flnm, 25, 2)

        select case asc(right(Depth,1))
           case 0
              Depth = 2 ^ (asc(left(Depth, 1)))
              gfxSpex = True
           case 2
              Depth = 2 ^ (asc(left(Depth, 1)) * 3)
              gfxSpex = True
           case 3
              Depth = 2 ^ (asc(left(Depth, 1)))  '8
              gfxSpex = True
           case 4
              Depth = 2 ^ (asc(left(Depth, 1)) * 2)
              gfxSpex = True
           case 6
              Depth = 2 ^ (asc(left(Depth, 1)) * 4)
              gfxSpex = True
           case else
              Depth = -1
        end select


     else

        strBuff = GetBytes(flnm, 0, -1)		' Get all bytes from file
        lngSize = len(strBuff)
        flgFound = 0

        strTarget = chr(255) & chr(216) & chr(255)
        flgFound = instr(strBuff, strTarget)

        if flgFound = 0 then
           exit function
        end if

        strImageType = "JPG"
        lngPos = flgFound + 2
        ExitLoop = false

        do while ExitLoop = False and lngPos < lngSize

           do while asc(mid(strBuff, lngPos, 1)) = 255 and lngPos < lngSize
              lngPos = lngPos + 1
           loop

           if asc(mid(strBuff, lngPos, 1)) < 192 or asc(mid(strBuff, lngPos, 1)) > 195 then
              lngMarkerSize = lngConvert2(mid(strBuff, lngPos + 1, 2))
              lngPos = lngPos + lngMarkerSize  + 1
           else
              ExitLoop = True
           end if

       loop
       '
       if ExitLoop = False then

          Width = -1
          Height = -1
          Depth = -1

       else

          Height = lngConvert2(mid(strBuff, lngPos + 4, 2))
          Width = lngConvert2(mid(strBuff, lngPos + 6, 2))
          Depth = 2 ^ (asc(mid(strBuff, lngPos + 8, 1)) * 8)
          gfxSpex = True

       end if
                   
     end if

  end function
%>