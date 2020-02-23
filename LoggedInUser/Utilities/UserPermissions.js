import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class UserPermissions {
    getCameraPermission = async () => {
        if(Constants.platform.android)
        {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status!="granted")
            alert("We need to have permission for your local storage to upload a profile Picture");
        }
    }
}

export default new UserPermissions();
