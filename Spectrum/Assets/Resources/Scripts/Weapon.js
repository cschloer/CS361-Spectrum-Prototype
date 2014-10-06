#pragma strict
public class Weapon extends MonoBehaviour{
	public var weaponObject : GameObject;
	public var owner : Character;
	public var model : WeaponModel;
	public var baseRotation : Vector3;
	public var basePosition : Vector3;
	//public var rotationPoint : Vector3;
	public var swinging : boolean;
	public var recovering : boolean;
	function init(c){
		this.name = "Weapon";
		swinging = false;
		recovering = false;
		owner = c;
		owner.setWeapon(this);
		weaponObject = new GameObject();
		weaponObject.name = "WeaponObject";
		//weaponObject.collider.enabled = false;
		
		baseRotation = Vector3(0, 0, -55);
		basePosition = Vector3(0, 0, 0);
	 	weaponObject.AddComponent(BoxCollider);
	 	weaponObject.GetComponent(BoxCollider).isTrigger = true;
	 	weaponObject.GetComponent(BoxCollider).size = Vector3(.1,2,.5);
	 	weaponObject.AddComponent(Rigidbody);
	 	weaponObject.GetComponent(Rigidbody).isKinematic = false;
	 	weaponObject.GetComponent(Rigidbody).useGravity = false;
	 	weaponObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
	 	weaponObject.transform.parent = owner.model.transform;
		model = weaponObject.AddComponent("WeaponModel");
		model.weapon = this;
		model.transform.parent = weaponObject.transform;								
		model.transform.localPosition = basePosition;						
		model.transform.localEulerAngles = baseRotation;						
		var spriteRenderer = weaponObject.AddComponent("SpriteRenderer") as SpriteRenderer;
		spriteRenderer.sprite = UnityEngine.Sprite.Create(Resources.Load("Textures/stick2", Texture2D), new Rect(40,0,60,100), new Vector2(0.5f, 0), 100f);
 		resetPosition();

 		}
 		
 	function distanceFromOwner(){
 		return Vector3.Magnitude(model.transform.position - owner.model.transform.position);
 	}
 	
 	function swing(angle : int, time : float, recovery : float){
 		swinging = true;
 		var t : float = 0;
 		while (t < time){
 			t += Time.deltaTime;
 			//model.transform.eulerAngles = baseRotation + Vector3(0, 0, angle*(t/time));
 			model.transform.RotateAround(model.transform.position, Vector3.forward, angle/time * Time.deltaTime);
 			yield;
 		}
 		
 		swinging = false;
 		recovering = true;
 		while (t < time + recovery){
 			t += Time.deltaTime;
 			model.transform.RotateAround(model.transform.position, Vector3.forward, -angle/recovery * Time.deltaTime);
 			yield;
 		}
 		model.transform.localEulerAngles = baseRotation;
 		model.transform.localPosition = basePosition;
 		recovering = false;
 	}
 	
 	function toss(distance : float, time : float, spinSpeed : float, recovery : float){
 		model.transform.parent = null;
 		var heading : Vector3 = owner.model.transform.up;
 		Vector3.Normalize(heading);
 		swinging = true;
 		var t : float = 0;
 		while (t < time){
 			t += Time.deltaTime;
 			model.transform.RotateAround(model.transform.position, Vector3.forward, spinSpeed * Time.deltaTime);
 			model.transform.position += (heading * distance * Time.deltaTime / time);
 			yield;
 		}
 		t=0;
 		while (distanceFromOwner() > .1){
 			t += Time.deltaTime;
 			model.transform.RotateAround(model.transform.position, Vector3.forward, spinSpeed * Time.deltaTime);
 			heading = model.transform.position - owner.model.transform.position;
 			model.transform.position -= (heading.normalized *distance * Time.deltaTime / time);
 			yield;
 		}
 		model.transform.parent = owner.model.transform;
		model.transform.localEulerAngles = baseRotation;
 		model.transform.localPosition = basePosition;
 		model.transform.position = owner.model.transform.position;
 		
 		swinging = false;
 		recovering = true;
 		while (t < time + recovery){
 			t += Time.deltaTime;
 			yield;
 		}
 		
 		recovering = false;
 	}
 		
 	function Update(){
 		if(Input.GetKeyDown("left shift") && !swinging && !recovering && owner.model.yellow){
 			swing(110, .3, 1);
 		}
 		if(Input.GetKeyDown("left shift") && !swinging && !recovering && !owner.model.yellow){
 			toss(4, 1.0, 500, 1);
 		}
 	}
 	
 	function OnTriggerEnter(col:Collider){
		print("Weapon collided with " + col.gameObject.name);
	}
	
	function resetPosition(){
		while (true){
			if(!swinging)
				model.transform.position = owner.model.transform.position;
			yield WaitForSeconds(.01);
			//print("Test");
		}
	}
	
	
 }