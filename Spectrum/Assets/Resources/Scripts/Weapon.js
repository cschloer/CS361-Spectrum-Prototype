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
	 	weaponObject.transform.parent = this.transform;
		model = weaponObject.AddComponent("WeaponModel");
		model.weapon = this;
		model.transform.parent = owner.model.transform;								
		model.transform.localPosition = basePosition;						
		model.transform.localEulerAngles = baseRotation;						
		var spriteRenderer = weaponObject.AddComponent("SpriteRenderer") as SpriteRenderer;
		spriteRenderer.sprite = UnityEngine.Sprite.Create(Resources.Load("Textures/stick2", Texture2D), new Rect(40,0,60,100), new Vector2(0.5f, 0), 100f);
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
 	
 	function Update(){
 		if(Input.GetKeyDown("left shift") && !swinging && !recovering){
 			swing(110, .3, 1);
 		}
 	}
 	
 	function OnTriggerEnter(col:Collider){
		print("Weapon collided with " + col.gameObject.name);
	}
	
 }