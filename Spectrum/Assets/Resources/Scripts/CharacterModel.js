var moveN:boolean;
var moveW:boolean;
var moveS:boolean;
var moveE:boolean;



var rotateL:boolean;
var rotateR:boolean;
var speed:int;

// Use this for initialization
function Start () {
	speed = 1;
}

// Update is called once per frame
function Update () {
	// this.gameObject.transform.Rotate(Vector3(0,0,Time.deltaTime)*30);
	if (rotateR) {
		this.transform.Rotate(Vector3(0,0,Time.deltaTime*80*(speed)));
		
	}
	if (rotateL) this.transform.Rotate(Vector3(0,0,-Time.deltaTime*80*(speed)));
	
	if (moveN) this.transform.Translate(Vector3.up * Time.deltaTime*speed);
	if (moveE) this.transform.Translate(Vector3.right * Time.deltaTime*speed);
	if (moveS) this.transform.Translate(Vector3.down * Time.deltaTime*speed);
	if (moveW) this.transform.Translate(Vector3.left * Time.deltaTime*speed);
	
		
}

function rotate(amount:float){
	this.gameObject.transform.Rotate(Vector3(0,0,amount));

}



