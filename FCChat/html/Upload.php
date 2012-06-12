<?php
//include the configuration file
include('config/php_config.php');
echo "<html><style>BODY {background-color: #bbbbbb;font-family:arial; font-size:12}</style><body><br><div style='border-bottom: #A91905 2px solid;font-size:16'><b><i>Share Images</i></b></div><form name='newad' method='post' enctype='multipart/form-data' action=''>";
//This function reads the extension of the file. It is used to determine if the file  is an image by checking the extension.
function getExtension($str) {
         $i = strrpos($str,".");
         if (!$i) { return ""; }
         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
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

//print_r(recursive_directory_size(IMAGES_DIRECTORY,TRUE));

//This variable is used as a flag. The value is initialized with 0 (meaning no error  found)  
//and it will be changed to 1 if an errro occures.  
//If the error occures the file will not be uploaded.
 $errors=0;
$filename='';
$newname='';
//checks if the form has been submitted
 if(isset($_POST['Submit'])) 
 {
	//reads the user
	$id=$_GET['id'];
	if(!is_numeric($id)){
		echo '<br><font face=arial><b>Invalid User!</font><font face=arial> Please Try again.</font></b><br>';
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
			if(strpos($filename,"[[")>=1 || strpos($filename,"]]")>=1){
				//print error message
 				echo '<br><font face=arial><b>Image Name may not contain [[ or ]].</font><font face=arial> Please Try again.</font></b><br>';
 				$errors=1;
			}else{
  				$extension = getExtension($filename);
 				$extension = strtolower($extension);
 				//if it is not a known extension, we will suppose it is an error and will not  upload the file,  
				//otherwise we will do more tests
 				if (($extension != "jpg") && ($extension != "jpeg") && ($extension != "png") && ($extension != "gif")) 
 				{
					//print error message
 					echo '<br><font face=arial><b>Bad Filetype!</font><font face=arial> Please Try again.</font></b><br>';
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
						echo '<br><font face=arial><b>You have exceeded the size limit for image files!</font><font face=arial> Please Try again.</font></b><br>';
						$errors=1;
					}else if (recursive_directory_size(IMAGES_DIRECTORY,FALSE)>MAX_DIR_SIZE){
						echo '<br><font face=arial><b>The image file repository is full!</font><font face=arial> Please Try again.</font></b><br>';
						$errors=1;
					}else{
						
						//we will give an unique name, for example the time in unix time format
						$image_name=$id.'_'.$filename;
						//the new name will be containing the full path where will be stored (images folder)
						$newname=IMAGES_DIRECTORY.$image_name;
						//we verify if the image has been uploaded, and print error instead
						$copied = copy($_FILES['image']['tmp_name'], $newname);
						//$my_image = array_values(getimagesize($newname));
  						//use list on new array
  						//list($width, $height, $type, $attr) = $my_image;

  						//view new array
  						//print_r($my_image);

  						//spit out content
  						//echo 'Attribute: '.$attr.'<br />';
  						//echo 'Width: '.$width.'<br />';
	
						if (!$copied) 
						{
							echo '<br><font face=arial><b>Upload Unsuccessful!</b></font><font face=arial> Try again</font><br>';
							$errors=1;
						}
					}
				}
			}
		}else{
			echo '<br><font face=arial><b>No image selected.</font><font face=arial> Please Try again.</font></b><br>';
 				$errors=1;
		}
	}
}

//If no errors registred, print the success message
 if(isset($_POST['Submit']) && !$errors) 
 {
 	echo "<br><font color=#444444 face=arial><b>".$filename."</font><font color=#444444 face=arial> Uploaded Successfully!</b><br><br><b>Step 2:</b></font><font face=arial> In order to use this image in your chat messages, simply copy and paste the following...<br><br><span style='font-size:16px'><b>[[".$filename."]]</b></span> <br><br>...into the chat box below.";
 }else{
	echo '<br><font color=#444444 face=arial><b>Step One:</b></font><font face=arial> Upload the image that you would like to use in your chat messages.</font><table><tr><td><input type="file" name="image"></td></tr>
<tr><td><input name="Submit" type="submit" value="Upload image"></td></tr><tr><td><font face=arial><small>(jpg,gif,and png only. Maximum size: '.MAX_FILE_SIZE.'KB)</small></font></td></tr></table> </form><br>';
 }
 if(isset($_POST['Submit']) && !$errors) 
 {
  	echo "<br><br><font color=#444444 face=arial> Please Note:</b></font><font face=arial>  You may include a maximum of three images in any single chat message.</small><br><br><a href='javascript:this.location.replace(window.parent.FCChatConfig.alt_dir+\"html/Upload.php?id=".$id."\")'>Back</a>&nbsp;<a href='javascript:window.parent.fc_chat.rem()'>Finish</a><br><br>";
 }
 ?>
<div style="border-bottom: #A91905 2px solid;font-size:10">Powered by <A HREF="http://www.php.net/" style="color:black">PHP</A></div></body><html>