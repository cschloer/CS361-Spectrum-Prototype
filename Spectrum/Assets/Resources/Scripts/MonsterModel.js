#pragma strict
public var monster : Monster;
function Start () {

}

function Update () {

}
function OnTriggerEnter(col:Collider){
		if(col.gameObject.GetComponent(WeaponModel).weapon.swinging && !monster.hurting) monster.hurt();
	}