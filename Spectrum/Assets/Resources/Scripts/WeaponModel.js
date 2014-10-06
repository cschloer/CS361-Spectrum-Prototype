#pragma strict
public var weapon : Weapon;
function Start () {

}

function Update () {

}

function OnTriggerEnter(col:Collider){
		//print(col.gameObject.name);
		if(col.gameObject.name.Contains("d:True") && weapon.swinging) Destroy(col.gameObject);
	}