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
var jumping:boolean;

var rjTimer:float;

var character : Character;
var modelObject;

var walkclip : AnimationClip;

var colorStore : Color;
var heading : Vector3;
var rollTime : float; 
var rollSpeed : float;
var rollCooldown : float;
var jumpCooldown : float;
// Use this for initialization
function Start () {
	speed = 2;
	blue = false;
	red = false;
	yellow = false;
	rolling = false;
	colorStore = Color(1,1,1);
	heading = Vector3.zero;
	rollTime = .5;
	rollSpeed = 8;
	rollCooldown = 1.5;
	jumpCooldown = 1;
	
}

// Update is called once per frame
function Update () {
	transform.position.z = 0;
	rjTimer += Time.deltaTime;
	if (rolling){
		this.transform.Translate(heading * Time.deltaTime*speed);
		if (rjTimer >= rollTime) { // Amount of time for rolling
			rolling = false;
			this.renderer.material.color = colorStore;	
			Manager.gameObject.GetComponentInChildren(CameraMovement).rolling = false;
			speed = 2;
			Manager.gameObject.GetComponentInChildren(CameraMovement).speed = 2;
			rjTimer = 0;
		}
	 }
	if (jumping){		
		if (rjTimer >= 1) { // Amount of time for jumping
			jumping = false;
			this.renderer.material.color = colorStore;	
			Manager.gameObject.GetComponentInChildren(CameraMovement).jumping = false;
			//modelObject.GetComponent(BoxCollider).isTrigger = false;
			gameObject.GetComponent(BoxCollider).isTrigger = true;
			rjTimer = 0;
			
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
		if (!jumping && !rolling) { 
			if (!blue && rjTimer >= rollCooldown){ // roll because blue
				// todo: roll animation
				colorStore = this.renderer.material.color;
				this.renderer.material.color = Color(.5,.5,.5);
				speed = rollSpeed;
				Manager.gameObject.GetComponentInChildren(CameraMovement).speed = rollSpeed;
				rolling = true;
				Manager.gameObject.GetComponentInChildren(CameraMovement).rolling = true;
				rjTimer = 0;
			}
			else if (blue && rjTimer >= jumpCooldown){ // jump because not blue
				// todo: jump animation
				colorStore = this.renderer.material.color;
				this.renderer.material.color = Color(2,2,2);
				jumping = true;
				Manager.gameObject.GetComponentInChildren(CameraMovement).jumping = true;
				rjTimer = 0;
				modelObject.GetComponent(BoxCollider).isTrigger = false;
			}
		
		}
	}
			
	if (!rolling){
		
		if (rotateR) this.transform.Rotate(Vector3(0,0,Time.deltaTime*160*(speed)));
		if (rotateL) this.transform.Rotate(Vector3(0,0,-Time.deltaTime*160*(speed)));
		
		heading = Vector3.zero;
		if (moveN) heading += Vector3.up;
		if (moveE) heading += Vector3.right;
		if (moveS) heading += Vector3.down;
		if (moveW) heading += Vector3.left;
		heading.Normalize();
		this.transform.Translate(heading * Time.deltaTime * speed);
	
	}	
	Manager.gameObject.GetComponentInChildren(CameraMovement).gameObject.transform.position = Vector3(this.transform.position.x, this.transform.position.y, -10)+3*this.transform.up;
	Manager.gameObject.GetComponentInChildren(CameraMovement).gameObject.transform.rotation = this.transform.rotation;
	//OnDrawGizmos();
}
function OnCollisionExit(collisionInfo : Collision){
	modelObject.GetComponent(Rigidbody).velocity = Vector3.zero;
}

function changeBlue(){
	if (blue){
		blue = false;
		this.renderer.material.color = colorChoice();
	}
	else{
		blue = true;
		this.renderer.material.color = colorChoice();
	}
	print("Blue: " + blue);

}
function changeRed(){
	if (red){
		red = false;
		this.renderer.material.color = colorChoice();
		this.transform.localScale = Vector3(1,1,1); 
		modelObject.GetComponent(BoxCollider).size = Vector3(.25,.5,10);
	}
	else {
		red = true;
		this.renderer.material.color = colorChoice();
		this.transform.localScale = Vector3(2,2,2); 
		modelObject.GetComponent(BoxCollider).size = Vector3(.5,1,10);
	}
	print("Red: " + red);

}
function changeYellow(){
	if (yellow) {
		yellow = false;
		this.renderer.material.color = colorChoice();
	}
	else {
	  yellow = true;
	  this.renderer.material.color = colorChoice();
	}
	print("Yellow: " + yellow);
}

function colorChoice(){
  if(red && yellow && blue){
  	return Color(0,0,0);
  } else if( red && yellow){
  	return Color(1,.5,0);
  } else if( red && blue){
  	return Color(1,0,1);
  } else if( yellow && blue){
  	return Color(0,1,0);
  } else if( yellow ){
  	return Color(1,1,0);
  } else if( blue ) {
  	return Color(0,0,1);
  } else if( red ){
  	return Color(1,0,0);
  } else {
  	return Color(1,1,1);
  }
}

/*function OnTriggerEnter(col:Collider){
	if (col.gameObject.name.Contains("Blue")){
		if (blue) blue = false;
		else blue = true;
		print("Blue: " + blue);
	}
	if (col.gameObject.name.Contains("Red")){
		if (red){
			red = false;
			this.transform.localScale = Vector3(1,1,1); 
			modelObject.GetComponent(BoxCollider).size = Vector3(.25,.5,10);
		}
		else {
			red = true;
			this.transform.localScale = Vector3(2,2,2); 
			modelObject.GetComponent(BoxCollider).size = Vector3(.5,1,10);
		}
		print("Red: " + red);
	}
	if (col.gameObject.name.Contains("Yellow")){
		if (yellow) yellow = false;
		else yellow = true;
		print("Yellow: " + yellow);
	}
}
*/

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
	
	//todo: stop moving animation
}

function OnTriggerEnter(col:Collider){
	if(col.gameObject.name.Contains("attack") && !character.hurting){
		character.hurt();
	}
}

function OnDrawGizmos() {
		// Draw a yellow cube at the transforms position
		Gizmos.color = Color.yellow;
		Gizmos.DrawWireCube (transform.position, modelObject.GetComponent(BoxCollider).size);
	
}

