export class Account {
  private _username: String = "admin";
  private _password: String = "admin";

  isConnected: boolean = false;

  constructor(private username: String, private password: String) {
    this.username = username;
    this.password = password;
  }

  public set Username(value: String) {
    this._username = value;
  }
  public get Username(): String {
    return this._username;
  }

  public set Password(value: String) {
    this._password = value;
  }
  public get Password(): String {
    return this._password;
  }
}

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.3.3/firebase-app.js"></script>
//
// <!-- TODO: Add SDKs for Firebase products that you want to use
//    https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.3.3/firebase-analytics.js"></script>
//
// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>
