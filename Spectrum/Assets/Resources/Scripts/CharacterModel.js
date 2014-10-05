var moveN:boolean;
var moveW:boolean;
var moveS:boolean;
var moveE:boolean;

var Manager;

var rotateL:boolean;
var rotateR:boolean;
var speed:int;

var blue:boolean;
var red:boolean;
var yellow:boolean;


// Use this for initialization
function Start () {
	speed = 1;
	blue = false;
	red = false;
	yellow = false;
	print(Manager.gameObject.GetComponentInChildren(CameraMovement));
}

// Update is called once per frame
function Update () {
	// this.gameObject.transform.Rotate(Vector3(0,0,Time.deltaTime)*30);
	
	if (Input.GetKeyUp("w")){
		 moveN = false;
		 Manager.gameObject.GetComponentInChildren(CameraMovement).moveN = false;
	}
	if (Input.GetKeyDown("w")) {
		moveN = true;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveN = true;
	}	
	if (Input.GetKeyUp("a")){
		moveW = false;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveW = false;	
	}
	if (Input.GetKeyDown("a")){
		 moveW = true;
		 Manager.gameObject.GetComponentInChildren(CameraMovement).moveW = true;
		}
	if (Input.GetKeyUp("s")){
		moveS = false;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveS = false;
	}
	if (Input.GetKeyDown("s")) {
		moveS = true;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveS = true;
	}		
	if (Input.GetKeyUp("d")) {
		moveE = false;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveE = false;
	}
	if (Input.GetKeyDown("d")) {
		moveE = true;
		Manager.gameObject.GetComponentInChildren(CameraMovement).moveE = true;
	}	
	
	if (Input.GetKeyUp("e")){
		if (!rotateR){
			rotateL = false;
			Manager.gameObject.GetComponentInChildren(CameraMovement).rotateL = false;
		}
	}
	if (Input.GetKeyDown("e")) {
		if (!rotateR){
			rotateL = true;
			Manager.gameObject.GetComponentInChildren(CameraMovement).rotateL = true;
		}
	}		
	if (Input.GetKeyUp("q")) {
		if(!rotateL){
			rotateR = false;
			Manager.gameObject.GetComponentInChildren(CameraMovement).rotateR = false;
		}
	}
	if (Input.GetKeyDown("q")) {
		if(!rotateL){
			rotateR = true;
			Manager.gameObject.GetComponentInChildren(CameraMovement).rotateR = true;
		}
	}
	if (Input.GetKeyDown("space")) {
		speed = 5;
		Manager.gameObject.GetComponentInChildren(CameraMovement).speed = 5;
	}
	if (Input.GetKeyUp("space")) {
		speed = 1;
		Manager.gameObject.GetComponentInChildren(CameraMovement).speed =1;
	}
	
	
	
	
	if (rotateR) {
		this.transform.Rotate(Vector3(0,0,Time.deltaTime*80*(speed)));
		
	}
	if (rotateL) this.transform.Rotate(Vector3(0,0,-Time.deltaTime*80*(speed)));
	
	if (moveN) this.transform.Translate(Vector3.up * Time.deltaTime*speed);
	if (moveE) this.transform.Translate(Vector3.right * Time.deltaTime*speed);
	if (moveS) this.transform.Translate(Vector3.down * Time.deltaTime*speed);
	if (moveW) this.transform.Translate(Vector3.left * Time.deltaTime*speed);
	
		
}

function OnTriggerEnter(col:Collider){
	if (col.gameObject.name.Contains("Blue")){
		if (blue) blue = false;
		else blue = true;
		print("Blue: " + blue);
	}
	if (col.gameObject.name.Contains("Red")){
		if (red) red = false;
		else red = true;
		print("Red: " + red);
	}
	if (col.gameObject.name.Contains("Yellow")){
		if (yellow) yellow = false;
		else yellow = true;
		print("Yellow: " + yellow);
	}
}




