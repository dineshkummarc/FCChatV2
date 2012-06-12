<%
Dim MAX_IMAGE_SIZE, MAX_FILE_SIZE, MAX_DIR_SIZE, MAX_WIDTH, MAX_HEIGHT, USE_BOARD_AVATARS, ALLOW_UPLOADS, USE_GRAVATAR, USE_GALLERY, IMAGES_DIRECTORY, AVATAR_DIRECTORY

ALLOW_UPLOADS = 0 '1=true/0=false

USE_BOARD_AVATARS = 0 '1=true/0=false

USE_GRAVATAR = 1 '1=true/0=false

USE_GALLERY = 1 '1=true/0=false

AVATAR_DIRECTORY = "images/avatars/" 'The value of this variable must be the same as that of avatars_dir in config.js. The path is relative to the html directory.

IMAGES_DIRECTORY = "images/" 'Directory where images should be stored. The path is relative to the html directory.

MAX_IMAGE_SIZE = 200 'in KB

MAX_WIDTH=70 'Maximum width of avatar in pixels

MAX_HEIGHT=70 'Maximum height of avatar in pixels

MAX_FILE_SIZE=MAX_IMAGE_SIZE*1024 'Don't change change

MAX_DIR_SIZE=1000000*1024 'Should not need to change this

%>