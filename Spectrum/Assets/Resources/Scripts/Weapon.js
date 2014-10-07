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
	public var swingSound : AudioSource; //Need one of these for each different clip.
	function init(c){
		this.name = "Weapon";
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
		stopSwinging();
		
		swingSound = gameObject.AddComponent("AudioSource") as AudioSource; //Initialized AudioSource
		swingSound.clip = Resources.Load("Sounds/woosh"); //Loads proper clip. In Unity Editor make sure "3D Sound" is UNCHECKED. It's checked by default. MP3s seem to work well and Audacity can export them.

 		}
 		
 	function distanceFromOwner(){
 		return Vector3.Magnitude(model.transform.position - owner.model.transform.position);
 	}
 	function startSwinging(){
 		swinging = true;
 		model.renderer.material.color = Color(1,1,1);
 		owner.model.rjTimer = owner.model.rollTime;

 	}
 	function stopSwinging(){
 		swinging = false;
 		model.renderer.material.color = Color(.8,.6,.6);
 	}
 	function startRecovery(){
 		recovering = true;
 		model.renderer.material.color = Color(.7,.5,.5);

 	}
 	function stopRecovery(){
 		recovering = false;
 		model.renderer.material.color = Color(.8,.6,.6);
 	}
 	
 	function swing(angle : int, time : float, recovery : float){
 		swingSound.Play(); // Plays the sound

 		startSwinging();
 		var t : float = 0;
 		while (t < time){
 				t += Time.deltaTime;
 			//model.transform.eulerAngles = baseRotation + Vector3(0, 0, angle*(t/time));
 				model.transform.RotateAround(model.transform.position, Vector3.forward, angle/time * Time.deltaTime);
 			
 			yield;
 		}
 		
 		stopSwinging();
		startRecovery();
 		while (t < time + recovery){
 			t += Time.deltaTime;
 			model.transform.RotateAround(model.transform.position, Vector3.forward, -angle/recovery * Time.deltaTime);
 			yield;
 		}
 		model.transform.localEulerAngles = baseRotation;
 		model.transform.localPosition = basePosition;
 		stopRecovery();
 	}

	function spin(time : float, recovery : float, overshoot : float){
		startSwinging();
 		var t : float = 0;
 		while (t < time){
 				t += Time.deltaTime;
 			//model.transform.eulerAngles = baseRotation + Vector3(0, 0, angle*(t/time));
 				model.transform.RotateAround(model.transform.position, Vector3.forward, (360 + overshoot)/time * Time.deltaTime);
 			
 			yield;
 		}
 		stopSwinging();
 		startRecovery();
 		t=0;
 		
 		while (t < recovery){
 			t += Time.deltaTime;
 			model.transform.RotateAround(model.transform.position, Vector3.forward, -overshoot/recovery * Time.deltaTime);
 			yield;
 		}
 		model.transform.localEulerAngles = baseRotation;
 		model.transform.localPosition = basePosition;
 		stopRecovery();
 	}
	
  	function toss(distance : float, time : float, spinSpeed : float, recovery : float){
 		model.transform.parent = null;
 		var heading : Vector3 = owner.model.transform.up;
 		Vector3.Normalize(heading);
 		startSwinging();
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
 		model.transform.localScale = Vector3.one;
 		stopSwinging();
 		startRecovery();
 		t=0;
 		while (t < recovery){
 			t += Time.deltaTime;
 			yield;
 		}
 		
 		stopRecovery();
 	}
 		
 	function Update(){
 		if(Input.GetKeyDown("left shift") && !swinging && !recovering && owner.model.yellow){
 			if(owner.model.jumping){
 				if(!owner.model.red){
 					spin(.5, 1.5, 110);
 				} else{
 					spin(1, 2.5, 110);
 				}
 			} else{
 				if(!owner.model.red){
 					swing(110, .3, 1);
 				} else {
 					swing(110, .5, 1.5);
 				}
 			}
 		}
 		if(Input.GetKeyDown("left shift") && !swinging && !recovering && !owner.model.yellow){
 			toss(4, 1.0, 1000, 1);
 		}
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