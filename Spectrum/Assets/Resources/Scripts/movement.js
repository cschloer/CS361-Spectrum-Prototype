#pragma strict

var target;
var Manager:GameManager;

var started:boolean;

var character:CharacterModel;
var moveN:boolean;
var moveW:boolean;
var moveS:boolean;
var moveE:boolean;

var rotateL:boolean;
var rotateR:boolean;
var speed:int;

function Start () {
	print(this.gameObject.name)
	Manager = this.gameObject.transform.parent.GetComponent(GameManager);
	character = Manager.character.model;
	speed = 1;
}

function Update(){
	print("here");
	if (Input.GetKeyUp("w")){
		print("herte");
		 moveN = false;
		 character.moveN = false;
	}
	if (Input.GetKeyDown("w")) {
		print("arhah");
		moveN = true;
		character.moveN = true;
	}	
	if (Input.GetKeyUp("a")){
		moveW = false;
		character.moveW = false;	
	}
	if (Input.GetKeyDown("a")){
		 moveW = true;
		 character.moveW = true;
		}
	if (Input.GetKeyUp("s")){
		moveS = false;
		character.moveS = false;
	}
	if (Input.GetKeyDown("s")) {
		moveS = true;
		character.moveS = true;
	}		
	if (Input.GetKeyUp("d")) {
		moveE = false;
		character.moveE = false;
	}
	if (Input.GetKeyDown("d")) {
		moveE = true;
		character.moveE = true;
	}	
	
	if (Input.GetKeyUp("e")){
		if (!rotateR){
			rotateL = false;
			character.rotateL = false;
		}
	}
	if (Input.GetKeyDown("e")) {
		if (!rotateR){
			rotateL = true;
			character.rotateL = true;
		}
	}		
	if (Input.GetKeyUp("q")) {
		if(!rotateL){
			rotateR = false;
			character.rotateR = false;
		}
	}
	if (Input.GetKeyDown("q")) {
		if(!rotateL){
			rotateR = true;
			character.rotateR = true;
		}
	}
	if (Input.GetKeyDown("space")) {
		speed = 5;
		character.speed = 5;
	}
	if (Input.GetKeyUp("space")) {
		speed = 1;
		character.speed =1;
	}
	

	if (rotateR) this.gameObject.transform.Rotate(Vector3(0,0,Time.deltaTime*80*(speed)));
	if (rotateL) this.gameObject.transform.Rotate(Vector3(0,0,-Time.deltaTime*80*(speed)));
	if (moveN) this.gameObject.transform.Translate(Vector3.up * Time.deltaTime*speed);
	if (moveE) this.gameObject.transform.Translate(Vector3.right * Time.deltaTime*speed);
	if (moveS) this.gameObject.transform.Translate(Vector3.down * Time.deltaTime*speed);
	if (moveW) this.gameObject.transform.Translate(Vector3.left * Time.deltaTime*speed);

	


	
}


