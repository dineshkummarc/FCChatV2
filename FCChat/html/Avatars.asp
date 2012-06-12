<%@ Language=VBScript %>
<% 
option explicit 
Response.Expires = -1
Server.ScriptTimeout = 600
Dim flext, rspln, rspln2
Dim arr(5)
Dim i
i = 1
arr(1) = "One"
arr(2) = "Two"
arr(3) = "Three"
arr(4) = "Four"
flext="asp"
rspln="http://www.freeaspupload.net" 
rspln2="Free ASP Upload"
%>
<!-- #include file="config/asp_config.asp" -->
<!-- #include file="freeaspupload.asp" -->
<%


' ****************************************************
' Change the value of the variable below to the pathname
' of a directory with write permissions, for example "C:\Inetpub\wwwroot"
   
' ****************************************************

' Note: this file uploadTester.asp is just an example to demonstrate
' the capabilities of the freeASPUpload.asp class. There are no plans
' to add any new features to uploadTester.asp itself. Feel free to add
' your own code. If you are building a content management system, you
' may also want to consider this script: http://www.webfilebrowser.com/

Dim filetable,avatars
avatars=true
filetable=""

Function listTheFiles(directory)
     	Dim size, filecount, columns
	size = 0
     	filecount=0
     	columns=1
	'Create the FileSystemObject object
     	Dim objFSO
	Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

  	'Obtain an folder object instance for a particular directory
  	Dim objFolder
  	Set objFolder = objFSO.GetFolder(Server.MapPath(directory))
  	'Use a For Each ... Next loop to display the files
  	Dim objFile
	Dim defaultfile 
	defaultfile = ""
	Dim file
	filetable="<table cellpadding=10 style='border: 1px solid #cccccc'><tr>"
  	For Each objFile in objFolder.Files
     		'Print out the name
     		'Response.Write objFile.Name & "<BR>"
		file=objFile.Name
		if file <> "default.gif" then
			// we build the new table
			If Len(file)>3 and inStr(file,"a1fc_")<>1 Then
				Dim path
				path = directory & "/" & file
				filetable=filetable & "<td width=80 style='background-color:#cccccc;'><center><img src='" & path & "' border=0  onclick=""this.style.border='3px solid green';window.parent.fc_chat.newAvatar('" & file & "',2,'" & flext & "','" & rspln & "','" & rspln2 & "');"" onmouseover='this.style.border=""1px solid blue""' onmouseout='this.style.border=""1px solid red""' style='border:1px solid red'></center></td>"
				If columns=4 Then
					filetable=filetable & "</tr><tr>"
					columns=0
				End If
				columns=columns+1
				filecount=filecount+1
			End If
		Else
			defaultfile = file
		End If
  	Next
	//Default avatar is last in gallery
	If defaultfile <> "" Then
		file=defaultfile
		If Len(file)>3 and inStr(file,"a1fc_")<>1 Then
			path = directory & "/" & file
			filetable=filetable & "<td width=80 style='background-color:#cccccc;'><center><img src='" & path & "' border=0  onclick=""this.style.border='3px solid green';window.parent.fc_chat.newAvatar('" & file & "',2,'" & flext & "','" & rspln & "','" & rspln2 & "');"" onmouseover='this.style.border=""1px solid blue""' onmouseout='this.style.border=""1px solid red""' style='border:1px solid red'></center></td>"
			If columns=4 Then
				filetable=filetable & "</tr><tr>"
				columns=0
			End If
			columns=columns+1
			filecount=filecount+1
		End If
	End If
	Dim i
	If columns<>1 Then
	 	For i=columns to 4
			filetable=filetable & "<td width=80 bgcolor=#cccccc>&nbsp;</td>"
	 	Next
	End If
	filetable=filetable & "</tr></table>"
         // close the directory
	listTheFiles = filecount
 	
End Function

Dim startdoc
startdoc="<script>function useCurrentAvatar(){window.parent.fc_chat.newAvatar('',3,'" & flext & "','" & rspln & "','" & rspln2 & "')};var gravatar;function useGravatar(){ gravatar= document.getElementById('fc_gravatar').value;document.getElementById('fc_gravatar').value='';if(gravatar.indexOf('gravatar.com/')==-1){return false}if(gravatar.indexOf('http://')!=0){gravatar='http://'+gravatar}var tester=new Image();tester.onload=isGood;tester.onerror=isBad;tester.src=gravatar}function isGood(){window.parent.fc_chat.newAvatar('/'+gravatar,4,'" & flext & "','" & rspln & "','" & rspln2 & "')}function isBad(){return false}</script><style>BODY {background-color: #bbbbbb;font-family:arial; font-size:12}</style><body><br><div style='border-bottom: #A91905 2px solid;font-size:16'><b><i>Select Avatar</i></b></div><div id='wait1' style='margin-top:100px;display:none'><center>Please wait...</center></div><div id='content1'>"


function write_upload_option()
%>
    <form name="frmSend" method="POST" enctype="multipart/form-data" action="" onSubmit="return onSubmitForm();">
	<br><font color=#444444 face=arial><b>Option <%=arr(i)%>:</b></font><font face=arial> Upload a new avatar. The maximum width and height for avatars is <%=MAX_HEIGHT%>px.</font><br><br>
    <input name="attach1" type="file" size=35><br>
    <input style="margin-top:4" type=submit value="Upload"><br>
    (Jpg, gif, and png formats only. Max size: <%=MAX_IMAGE_SIZE%>KB)
    </form>
<%
end function

function TestEnvironment()
    Dim fso, fileName, testFile, streamTest
    TestEnvironment = ""
    Set fso = Server.CreateObject("Scripting.FileSystemObject")
    if not fso.FolderExists(Server.MapPath(AVATAR_DIRECTORY)) then
        TestEnvironment = "<B>Folder " & Server.MapPath(AVATAR_DIRECTORY) & " does not exist.</B><br>The value of your AVATAR_DIRECTORY is incorrect. Open asp_config.asp in an editor and change the value of AVATAR_DIRECTORY to the pathname of a directory with write permissions."
        exit function
    end if
    fileName = Server.MapPath(AVATAR_DIRECTORY) & "\test.txt"
    on error resume next
    Set testFile = fso.CreateTextFile(fileName, true)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & Server.MapPath(AVATAR_DIRECTORY) & " does not have write permissions.</B><br>The value of your AVATAR_DIRECTORY is incorrect. Open asp_config.asp in an editor and change the value of AVATAR_DIRECTORY to the pathname of a directory with write permissions."
        exit function
    end if
    Err.Clear
    testFile.Close
    fso.DeleteFile(fileName)
    If Err.Number<>0 then
        TestEnvironment = "<B>Folder " & Server.MapPath(AVATAR_DIRECTORY) & " does not have delete permissions</B>, although it does have write permissions.<br>Change the permissions for IUSR_<I>computername</I> on this folder."
        exit function
    end if
    Err.Clear
    Set streamTest = Server.CreateObject("ADODB.Stream")
    If Err.Number<>0 then
        TestEnvironment = "<B>The ADODB object <I>Stream</I> is not available in your server.</B><br>Check the Requirements page for information about upgrading your ADODB libraries."
        exit function
    end if
    Set streamTest = Nothing
end function

function SaveFiles
    Dim Upload, fileName, fileSize, ks, i, fileKey

    Set Upload = New FreeASPUpload
    Upload.Save(Server.MapPath(AVATAR_DIRECTORY))

	' If something fails inside the script, but the exception is handled
	If Err.Number<>0 then Exit function
    SaveFiles = ""
    ks = Upload.UploadedFiles.keys
   
    if (UBound(ks) <> -1) then
        if errorstring = "" then
       		for each fileKey in Upload.UploadedFiles.keys
            		SaveFiles = "<script>function relayAvatar(){window.parent.fc_chat.newAvatar('" & theFile & "',1,'" & flext & "','" & rspln & "','" & rspln2 & "');}function useCurrentAvatar(){window.parent.fc_chat.newAvatar('',3)};var gravatar;function useGravatar(){ gravatar= document.getElementById('fc_gravatar').value;document.getElementById('fc_gravatar').value='';if(gravatar.indexOf('gravatar.com/')==-1){return false}if(gravatar.indexOf('http://')!=0){gravatar='http://'+gravatar}var tester=new Image();tester.onload=isGood;tester.onerror=isBad;tester.src=gravatar}function isGood(){window.parent.fc_chat.newAvatar('/'+gravatar,4,'" & flext & "','" & rspln & "','" & rspln2 & "')}function isBad(){return false}</script><style>BODY {background-color: white;font-family:arial; font-size:12}</style><body onload=""setTimeout('relayAvatar()',1000);""><br><div style='border-bottom: #A91905 2px solid;font-size:16'>Upload Avatars</div><div id='wait1' style='margin-top:100px'><center>Please wait...</center></div><div id='content1' style='display:none'><br><font face=arial><b>" & Upload.UploadedFiles(fileKey).FileName & " (" & Upload.UploadedFiles(fileKey).Length & "KB)</font><font face=arial> You have successfully uploaded a new avatar!</b></font><br><br><a href='javascript:this.location.replace(window.parent.FCChatConfig.alt_dir+""html/Avatars.asp?id=" & userID & """)'>Back</a>&nbsp;<a href='javascript:window.parent.fc_chat.rem()'>Finish</a><br><br>"
        	next
	else
		SaveFiles = startdoc & errorstring
	end if
    else
        SaveFiles = startdoc & "<br>The file name specified in the upload form does not correspond to a valid file in the system.<br><br>"
	errorstring = "-1"
    end if
end function
%>

<HTML>
<HEAD>
<TITLE>Avatars</TITLE>
<style>
BODY {background-color: white;font-family:arial; font-size:12}
</style>
<script>
function onSubmitForm() {
    var formDOMObj = document.frmSend;
    if (formDOMObj.attach1.value == "" && formDOMObj.attach2.value == "" && formDOMObj.attach3.value == "" && formDOMObj.attach4.value == "" )
        alert("Please press the browse button and pick a file.")
    else
        return true;
    return false;
}
</script>
<%
Dim diagnostics
Dim optionsconfig
Dim option1
Dim option2
Dim option3
Dim option4
if Request.ServerVariables("REQUEST_METHOD") <> "POST" then
    response.write startdoc
    diagnostics = TestEnvironment()
    if diagnostics<>"" then
        response.write diagnostics
        response.write "<p>After you correct this problem, reload the page."
    else

	if (ALLOW_UPLOADS=1) Then
		Write_upload_option()
		i = i + 1
	End If
	if (USE_GRAVATAR=1) Then
		option2="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Use your <a href='http://gravatar.com' target=_blank>Gravatar</a> avatar.</font><br><br><div style='margin-left:20px'><INPUT id='fc_gravatar' TYPE=text NAME='gravatar' VALUE='' style='width:200px'> <input type='button' name='Submit' value='Submit' onclick='useGravatar();'><br>Link to gravatar Image.<br>(ie http://www.gravatar.com/avatar/1234.png)</div><br>"
		i = i + 1
	End If
	if (USE_BOARD_AVATARS=1) Then
		option3="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Use your current forum avatar.</font><div style='margin-left:20px'><INPUT TYPE=checkbox NAME='current' VALUE='1' onclick='useCurrentAvatar();'>Use my current avatar.</div><br>"
		i = i + 1
	End If
	if (USE_GALLERY=1) Then
		option4="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Select an avatar from the gallery below.</font>"
		i = i + 1
		If listTheFiles(AVATAR_DIRECTORY)<>0 Then
			option4 = option4 & "<br>" & filetable
		End If
	End If
	response.write option2 & option3 & option4



	'optionsconfig="<font color=#444444 face=arial><b>Option Two:"
	'If USE_BOARD_AVATARS=1 Then
	'	optionsConfig="<font color=#444444 face=arial><b>Option Two:</b></font><font face=arial> Use your current forum avatar.</font><div style='margin-left:20px'><INPUT TYPE=checkbox NAME=current VALUE=1 onclick='useCurrentAvatar();'>Use my current avatar.</div><br><br><font color=#444444 face=arial><b>Option Three:"
	'End If
       ' OutputForm()
	'response.write "<br>" & optionsconfig & "</b></font><font face=arial> Select an avatar from the gallery below.</font>"
	'If listTheFiles(AVATAR_DIRECTORY)<>0 Then
	'	response.write "<br>" & filetable
	'End If
    end if
else
    response.write SaveFiles()
    if errorstring<>"" then
	if (ALLOW_UPLOADS=1) Then
		Write_upload_option()
		i = i + 1
	End If
	if (USE_GRAVATAR=1) Then
		option2="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Use your current forum avatar.</font><div style='margin-left:20px'><INPUT TYPE=checkbox NAME='current' VALUE='1' onclick='useCurrentAvatar();'>Use my current avatar.</div><br>"
		i = i + 1
	End If
	if (USE_BOARD_AVATARS=1) Then
		option3="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Use your current forum avatar.</font><div style='margin-left:20px'><INPUT TYPE=checkbox NAME='current' VALUE='1' onclick='useCurrentAvatar();'>Use my current avatar.</div><br>"
		i = i + 1
	End If
	if (USE_GALLERY=1) Then
		option4="<br><font color=#444444 face=arial><b>Option " & arr(i) & ":</b></font><font face=arial> Select an avatar from the gallery below.</font>"
		i = i + 1
		If listTheFiles(AVATAR_DIRECTORY)<>0 Then
			option4 = option4 & "<br>" & filetable
		End If
	End If
	response.write option2 & option3 & option4
    end if
    response.write "<br><br>"
end if

%>
<br>
<!-- Please support this free script by having a link to freeaspupload.net either in this page or somewhere else in your site. -->
<div style="border-bottom: #A91905 2px solid;font-size:10">Powered by <A HREF="http://www.freeaspupload.net/" style="color:black">Free ASP Upload</A></div></div>

<br><br>


</BODY>
</HTML>
