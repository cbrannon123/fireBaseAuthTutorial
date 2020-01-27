const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if( context.auth.token.admin !== true ) {
        return { err: "Nice try, you're not an admin."}
    }

    //get user and add costom claim (admin)
    return admin.auth().getUserByEmail(data.email).then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Sucess! ${data.email} has been made admin`
        }
    }).catch(err => {
        return err
    }) 
});