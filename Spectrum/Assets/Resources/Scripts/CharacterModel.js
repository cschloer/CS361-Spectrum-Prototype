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

var rolling:boolean;

var rollTimer:float;


// Use this for initialization
function Start () {
	speed = 1;
	blue = false;
	red = false;
	yellow = false;
	rolling = false;
}

// Update is called once per frame
function Update () {

	if (rolling){
		rollTimer += Time.deltaTime;
		this.transform.Translate(Vector3.up * Time.deltaTime*speed);
		if (rollTimer >= 0.5) { // Amount of time for rolling
			rolling = false;
			this.renderer.material.color = Color(1,1,1);	
			Manager.gameObject.GetComponentInChildren(CameraMovement).rolling = false;
			speed = 1;
			Manager.gameObject.GetComponentInChildren(CameraMovement).speed = 1;
		}
	
	}
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
		if (blue){ // roll because blue
			this.renderer.material.color = Color(.5,.5,.5);
			speed = 10;
			Manager.gameObject.GetComponentInChildren(CameraMovement).speed = 10;
			rolling = true;
			Manager.gameObject.GetComponentInChildren(CameraMovement).rolling = true;
			rollTimer = 0;
		}
		else { // jump because not blue
		
		
		
		}
	}
	/*if (Input.GetKeyUp("space")) {
		speed = 1;
		Manager.gameObject.GetComponentInChildren(CameraMovement).speed =1;
	}*/
	
	
	
	
	if (!rolling){
	
		if (rotateR) {
			this.transform.Rotate(Vector3(0,0,Time.deltaTime*160*(speed)));
			
		}
		if (rotateL) this.transform.Rotate(Vector3(0,0,-Time.deltaTime*160*(speed)));
		
		if (moveN) this.transform.Translate(Vector3.up * Time.deltaTime*speed);
		if (moveE) this.transform.Translate(Vector3.right * Time.deltaTime*speed);
		if (moveS) this.transform.Translate(Vector3.down * Time.deltaTime*speed);
		if (moveW) this.transform.Translate(Vector3.left * Time.deltaTime*speed);
	
	}	
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


function stopMovement(){
	rotateR = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).rotateR = false;
	rotateL = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).rotateL = false;
	
	moveE = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).moveE = false;
	moveW = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).moveW = false;	
	moveS = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).moveS = false;
	moveN = false;
	Manager.gameObject.GetComponentInChildren(CameraMovement).moveN = false;
}



