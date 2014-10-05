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
var rolling:boolean;

function Start () {
	this.transform.position = Vector3(0,0,-10);
	Manager = this.gameObject.transform.parent.GetComponent(GameManager);
	character = Manager.character.model;
//	character.camera = this.gameObject;
	speed = 1;
}

function Update(){
	if (rolling) this.gameObject.transform.Translate(Vector3.up * Time.deltaTime*speed);
	else {
		if (rotateR) this.gameObject.transform.Rotate(Vector3(0,0,Time.deltaTime*160*(speed)));
		if (rotateL) this.gameObject.transform.Rotate(Vector3(0,0,-Time.deltaTime*160*(speed)));
		if (moveN) this.gameObject.transform.Translate(Vector3.up * Time.deltaTime*speed);
		if (moveE) this.gameObject.transform.Translate(Vector3.right * Time.deltaTime*speed);
		if (moveS) this.gameObject.transform.Translate(Vector3.down * Time.deltaTime*speed);
		if (moveW) this.gameObject.transform.Translate(Vector3.left * Time.deltaTime*speed);
	}

	


	
}


