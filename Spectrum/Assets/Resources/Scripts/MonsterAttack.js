#pragma strict
var range : float;
var speed : float;
var fade : boolean;
var traveled : float;
var home : float;
var hero : Character;

function init(r : float, s : float, f : boolean, h : float){
	range = r;
	speed = s;
	fade = f;
	traveled = 0;
	home = h;
}
function Start () {

}

function Update () {
	traveled += Time.deltaTime * speed;
	transform.position += transform.up * Time.deltaTime*speed;
	if(traveled >= range) Destroy(gameObject);
	if(fade) renderer.material.color.a = 1-(traveled/range);
	if(home > 0) turnToHero(home);
}

public function turnToHero(multiplier : float){
		var vectorToHero : Vector3 = transform.position - hero.model.transform.position;
		var anglesToHero : float = Mathf.Atan2(vectorToHero.y, vectorToHero.x) * Mathf.Rad2Deg - 90;
		if (anglesToHero < 0) anglesToHero += 360;
		//print("AnglestoHero: " + anglesToHero + ", Z: " + model.transform.eulerAngles.z);
		var sign : float = -1;
		if((transform.eulerAngles.z + (360-anglesToHero)) % 360 < 180) sign = 1;
		transform.eulerAngles += Vector3(0, 0, Time.deltaTime * 90 * sign * multiplier);
	}