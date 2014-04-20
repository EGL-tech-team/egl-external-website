EGL External Website
====================

The project details such as mission, scope, and desired metrics of impact can be found on the ctools wiki, here: https://ctools.umich.edu/portal/site/cc127356-dbe0-45e6-ba72-75abe944cee3/page/31883a57-89ee-4b69-82e4-6e2cead73789

Current
----------
The current folder represents the current state of the website. It includes all html files and other assets of the website.


Old Theme
-----------
The old theme folder contains resources from an initial trial at implementing the website. This folder is maintained to keep content until it can be included in the current website. Eventually, this folder should be deleted.

Deployment
------------
While testing can be done locally. Some features, such as server side includes, require deployment to a personal webspace.

Proper webspace permissions must be setup prior to using the script. Instructions can be found here:

http://www.umich.edu/~umweb/how-to/homepage.html

The deploy.sh script allows for quick testing of changes on a user personal webspace.

The script deploys to:

http://www-personal.umich.edu/~{unique_name}/{folder_name}/

Both the {unique_name} and {folder_name} are prompted for after running the script.

In the future, a script should be written for deployment of the final website. Deployment scripts ensure that each rollout of the website is exactly the same and serve as documentation for how the website should be deployed. Ideally, no manual intervention will be required other than starting the deployment script.
