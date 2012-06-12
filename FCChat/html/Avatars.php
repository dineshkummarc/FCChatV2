<?php
 //include the configuration file
 include('config/php_config.php');
 $flext='php';
$rspln='http://www.php.net'; 
$rspln2='PHP';
//This function reads the extension of the file. It is used to determine if the file  is an image by checking the extension.
 function getExtension($str) {
         $i = strrpos($str,".");
         if (!$i) { return ""; }
         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
 }

$filetable='';

function list_files($directory)
 {
     Global $filetable,$flext,$rspln,$rspln2;
     $size = 0;
     $filecount=0;
     $columns=1;
     // if the path has a slash at the end we remove it here
     if(substr($directory,-1) == '/')
     {
         $directory = substr($directory,0,-1);
     }
     
     // if the path is not valid or is not a directory ...
     if(!file_exists($directory) || !is_dir($directory) || !is_readable($directory))
     {
         // ... we return 0 and exit the function
	 echo(!file_exists($directory) . !is_dir($directory) . !is_readable($directory));
         return 0;
     }
     // we open the directory
     if($handle = opendir($directory))
     {
	$filetable="<table cellpadding=10 style='border: 1px solid #cccccc'><tr>";
	$defaultfile="";
         // and scan through the items inside
         while(($file = readdir($handle)) != false)
         {
	     	if($file != "default.gif"){
             		// we build the new table
			if(strlen($file)>3 && strpos($file,"1fc_")!=1){
				$path = $directory.'/'.$file;
				$filetable=$filetable."<td width=80 style='background-color:#cccccc;'><center><img src='".$path."' border=0  onclick=\"this.style.border='3px solid green';window.parent.fc_chat.newAvatar('".$file."',2,'".$flext."','".$rspln."','".$rspln2."');\" onmouseover='this.style.border=\"1px solid blue\"' onmouseout='this.style.border=\"1px solid red\"' style='border:1px solid red'></center></td>";
				if($columns==4){
					$filetable=$filetable."</tr><tr>";
					$columns=0;
				}
				$columns++;
				$filecount++;
			}
		}else{
			$defaultfile=$file;
		}
         }
	if($defaultfile!=""){
		$file=$defaultfile;
		if(strlen($file)>3 && strpos($file,"1fc_")!=1){
			$path = $directory.'/'.$file;
			$filetable=$filetable."<td width=80 style='background-color:#cccccc;'><center><img src='".$path."' border=0  onclick=\"this.style.border='3px solid green';window.parent.fc_chat.newAvatar('".$file."',2,'".$flext."','".$rspln."','".$rspln2."');\" onmouseover='this.style.border=\"1px solid blue\"' onmouseout='this.style.border=\"1px solid red\"' style='border:1px solid red'></center></td>";
			if($columns==4){
				$filetable=$filetable."</tr><tr>";
				$columns=0;
			}
			$columns++;
			$filecount++;
		}
	}
	if($columns!=1){
	 	for($columns;$columns<5;$columns++){
			$filetable=$filetable."<td width=80 bgcolor=#cccccc>&nbsp;</td>";
	 	}
	}
	 $filetable=$filetable."</tr></table>";
         // close the directory
         closedir($handle);
     }
	
	return $filecount;
 }

function recursive_directory_size($directory, $format=FALSE)
 {
     $size = 0;
  
     // if the path has a slash at the end we remove it here
     if(substr($directory,-1) == '/')
     {
         $directory = substr($directory,0,-1);
     }
  
     // if the path is not valid or is not a directory ...
     if(!file_exists($directory) || !is_dir($directory) || !is_readable($directory))
     {
         // ... we return -1 and exit the function
         return -1;
     }
     // we open the directory
     if($handle = opendir($directory))
    {
         // and scan through the items inside
         while(($file = readdir($handle)) !== false)
         {
             // we build the new path
             $path = $directory.'/'.$file;
             // if the filepointer is not the current directory
             // or the parent directory
             if($file != '.' && $file != '..')
             {
                 // if the new path is a file
                 if(is_file($path))
                 {
                     // we add the filesize to the total size
                     $size += filesize($path);
  
                 // if the new path is a directory
                }elseif(is_dir($path))
                {
                    // we call this function with the new path
                     $handlesize = recursive_directory_size($path);
  
                     // if the function returns more than zero
                     if($handlesize >= 0)
                     {
                         // we add the result to the total size
                         $size += $handlesize;
  
                     // else we return -1 and exit the function
                     }else{
                         return -1;
                     }
                 }
             }
         }
         // close the directory
         closedir($handle);
     }
     // if the format is set to human readable
     if($format == TRUE)
     {
         // if the total size is bigger than 1 MB
         if($size / 1048576 > 1)
         {
             return round($size / 1048576, 1).' MB';
  
         // if the total size is bigger than 1 KB
         }elseif($size / 1024 > 1)
         {
             return round($size / 1024, 1).' KB';
         // else return the filesize in bytes
        }else{
             return round($size, 1).' bytes';
         }
     }else{
         // return the total filesize in bytes
         return $size;
     }
 }

function user_avatar_delete($avatar_file)
{
	if ( $avatar_file != '' )
	{
		if ( file_exists($avatar_file))
		{
			unlink($avatar_file);
		}
	}
	return true;
}

//This variable is used as a flag. The value is initialized with 0 (meaning no error  found)  
//and it will be changed to 1 if an errro occures.  
//If the error occures the file will not be uploaded.

$errors=0;
$errorstring='';
$filename='';
$newname='';
//checks if the form has been submitted
$startdoc="<html><script>function useCurrentAvatar(){window.parent.fc_chat.newAvatar('',3,'".$flext."','".$rspln."','".$rspln2."')};var gravatar;function useGravatar(){ gravatar= document.getElementById('fc_gravatar').value;document.getElementById('fc_gravatar').value='';if(gravatar.indexOf('gravatar.com/')==-1){return false}if(gravatar.indexOf('http://')!=0){gravatar='http://'+gravatar}var tester=new Image();tester.onload=isGood;tester.onerror=isBad;tester.src=gravatar}function isGood(){window.parent.fc_chat.newAvatar('/'+gravatar,4,'".$flext."','".$rspln."','".$rspln2."')}function isBad(){return false}</script><style>BODY {background-color: #bbbbbb;font-family:arial; font-size:12}</style><body><br><div style='border-bottom: #A91905 2px solid;font-size:16'><b><i>Select Avatar</i></b></div><div id='wait1' style='margin-top:100px;display:none'><center>Please wait...</center></div><div id='content1'>";

 if(isset($_POST['Submit'])) 
 {
	//reads the user
	$id=$_GET['id'];
	if(!is_numeric($id)){
		$errorstring='<br><font color=red face=arial><b>Invalid User!</font><font face=arial> Please Try again.</font></b><br><br>';
		$errors=1;
	}else{
 		//reads the name of the file the user submitted for uploading
 		$image=$_FILES['image']['name'];
 		//if it is not empty
 		if ($image) 
 		{
 			//get the original name of the file from the clients machine
 			$filename = stripslashes($_FILES['image']['name']);
 			//get the extension of the file in a lower case format
  			$extension = getExtension($filename);
 			$extension = strtolower($extension);
 			//if it is not a known extension, we will suppose it is an error and will not  upload the file,  
			//otherwise we will do more tests
 			if (($extension != "jpg") && ($extension != "jpeg") && ($extension != "png") && ($extension != "gif")) 
 			{
				//print error message
 				$errorstring='<br><font color=red face=arial><b>Bad Filetype!</font><font face=arial> Please Try again.</font></b><br><br>';
 				$errors=1;
 			}
 			else
 			{
				//get the size of the image in bytes
 				//$_FILES['image']['tmp_name'] is the temporary filename of the file
 				//in which the uploaded file was stored on the server
 				$size=filesize($_FILES['image']['tmp_name']);

				//compare the size with the maxim size we defined and print error if bigger
				if ($size > MAX_FILE_SIZE*1024)
				{
					$errorstring='<br><font face=arial><b>You have exceeded the size limit for image files!</font><font face=arial> Please Try again.</font></b><br><br>';
					$errors=1;
				}else if (recursive_directory_size(AVATAR_DIRECTORY,FALSE)>MAX_DIR_SIZE){
					$errorstring='<br><font face=arial><b>The image file repository is full!</font><font face=arial> Please Try again.</font></b><br><br>';
					$errors=1;
				}else{
						
					//we will give an unique name, for example the time in unix time format
					$image_name='a1fc_'.$id.'_'.$filename;
					//the new name will be containing the full path where will be stored (images folder)
					$newname=AVATAR_DIRECTORY.$image_name;
					//we verify if the image has been uploaded, and print error instead
					$copied = copy($_FILES['image']['tmp_name'], $newname);
					$my_image = array_values(getimagesize($newname));
  					//use list on new array
  					list($width, $height, $type, $attr) = $my_image;

  					//view new array
  					//print_r($my_image);

  					//spit out content
  					//echo 'Attribute: '.$attr.'<br />';
	
					if (!$copied) 
					{
						$errorstring='<br><font face=arial><b>Upload Unsuccessful!</b></font><font face=arial> Try again</font><br><br>';
						$errors=1;
					}else{
						//Check height and width
						if($width<=MAX_WIDTH&&$height<=MAX_HEIGHT){	
							$base = basename($newname);
							$startdoc="<html><script>function relayAvatar(){window.parent.fc_chat.newAvatar('".$base."',1,'".$flext."','".$rspln."','".$rspln2."');}function useCurrentAvatar(){window.parent.fc_chat.newAvatar('',3,'".$flext."','".$rspln."','".$rspln2."')};var gravatar;function useGravatar(){ gravatar= document.getElementById('fc_gravatar').value;document.getElementById('fc_gravatar').value='';if(gravatar.indexOf('gravatar.com/')==-1){return false}if(gravatar.indexOf('http://')!=0){gravatar='http://'+gravatar}var tester=new Image();tester.onload=isGood;tester.onerror=isBad;tester.src=gravatar}function isGood(){window.parent.fc_chat.newAvatar('/'+gravatar,4,'".$flext."','".$rspln."','".$rspln2."')}function isBad(){return false}</script><style>BODY {background-color: white;font-family:arial; font-size:12}</style><body onload=\"setTimeout('relayAvatar()',1000);\"><br><div style='border-bottom: #A91905 2px solid;font-size:16'>Upload Avatars</div><div id='wait1' style='margin-top:100px'><center>Please wait...</center></div><div id='content1' style='display:none'>";
						}else{
							$deleted=user_avatar_delete($newname);
							$errorstring='<br><font face=arial><b>The width and height of the images can be no larger than '.MAX_WIDTH.'px and '.MAX_HEIGHT.'px respectively!</b></font><font face=arial> Try again</font><br><br>';
							$errors=1;
						}
					}
				}
			}
		}else{
			$errorstring='<br><font face=arial><b>No image selected.</font><font face=arial> Please Try again.</font></b><br><br>';
 			$errors=1;
		}
	}
}

//If no errors registred, print the success message
 if(isset($_POST['Submit']) && !$errors) 
 {
 	echo $startdoc."<br><font face=arial><b>".$filename."</font><font face=arial> You have successfully uploaded a new avatar!</b></font><br><br><a href='javascript:this.location.replace(window.parent.FCChatConfig.alt_dir+\"html/Avatars.php?id=".$id."\")'>Back</a>&nbsp;<a href='javascript:window.parent.fc_chat.rem()'>Finish</a><br><br>";
 }else{
	$arr = array(1 => "One", 2 => "Two" ,3 => "Three", 4 => "Four");
	$i=1;
	$option1='';
	$option2='';
  	$option3='';
	$option4='';
	if(ALLOW_UPLOADS){
		$option1 = '<form name="newad" method="post" enctype="multipart/form-data" action=""><br><font color=#444444 face=arial><b>Option '.$arr[$i].':</b></font><font face=arial> Upload a new avatar. The maximum width and height for avatars is '.MAX_HEIGHT.'px.</font><table style="margin-left:20px"><tr><td><input type="file" name="image" ></td></tr><tr><td><input name="Submit" type="submit" value="Upload image"></td></tr><tr><td><font face=arial><small>(jpg,gif,and png only. Maximum size: '.MAX_FILE_SIZE.'KB)</small></font></td></tr></table> </form>';
		$i++;
	}
	if(USE_GRAVATAR){
		$option2='<br><font color=#444444 face=arial><b>Option '.$arr[$i].':</b></font><font face=arial> Use your <a href="http://gravatar.com" target=_blank>Gravatar</a> avatar.</font><br><br><div style="margin-left:20px"><INPUT id="fc_gravatar" TYPE=text NAME="gravatar" VALUE="" style="width:200px"> <input type="button" name="Submit" value="Submit" onclick="useGravatar();"><br>Link to gravatar Image.<br>(ie http://www.gravatar.com/avatar/1234.png)</div><br>';
		$i++;
	}
	if(USE_BOARD_AVATARS){
		$option3='<br><font color=#444444 face=arial><b>Option '.$arr[$i].':</b></font><font face=arial> Use your current forum avatar.</font><div style="margin-left:20px"><INPUT TYPE=checkbox NAME="current" VALUE="1" onclick="useCurrentAvatar();">Use my current avatar.</div><br>';
		$i++;
	}
	if(USE_GALLERY){
		$option4='<br><font color=#444444 face=arial><b>Option '.$arr[$i].':</b></font><font face=arial> Select an avatar from the gallery below.</font>';
		$i++;
		if(list_files(AVATAR_DIRECTORY)!=0){
			$option4 = $option4.'<br>'.$filetable;
		}
	}
	echo $startdoc.$errorstring.$option1.$option2.$option3.$option4;
 }
 ?>
<div style="border-bottom: #A91905 2px solid;font-size:10"><br>Powered by <A HREF="http://www.php.net/" style="color:black">PHP</A></div></div></body><html>