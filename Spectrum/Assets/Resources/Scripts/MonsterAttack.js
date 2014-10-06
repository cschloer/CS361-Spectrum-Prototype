#pragma strict
var range : float;
var speed : float;
var fade : boolean;
var traveled : float;

function init(r : float, s : float, f : boolean){
	range = r;
	speed = s;
	fade = f;
	traveled = 0;
}
function Start () {

}

function Update () {
	traveled += Time.deltaTime * speed;
	transform.position += transform.up * Time.deltaTime*speed;
	if(traveled >= range) Destroy(gameObject);
	if(fade) renderer.material.color.a = 1-(traveled/range);
}