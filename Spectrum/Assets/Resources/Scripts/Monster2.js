// Distancer Blue
public class Monster2 extends Monster {

	public var timing : float;
	public var chargin : boolean;
	public var attacked : boolean;
	public var chargeSound : AudioSource; //Need one of these for each different clip.



	// Changing Init function to vary appearance and hitboxes.
	public function init(c : Character) {
		hero = c;
		hurting = false;
		health = 4;
		hurtRecovery = .7;
		modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
		model = modelObject.AddComponent("MonsterModel");						// Add a gemModel script to control visuals of the gem.
		model.monster = this;
		//gemType = 1;
		moveSpeed = .75;
		turnSpeed = 60;
		timing = 0;
		chargin = false;
		attacked = false;
			
		model.transform.parent = transform;									// Set the model's parent to the gem (this object).
		model.transform.localScale = Vector3(1.5,1.5,1.5);					// Make him a big'un.
		model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
		model.name = "Monster Model";										// Name the object.
		model.renderer.material.mainTexture = Resources.Load("Textures/gem2", Texture2D);	// Set the texture.  Must be in Resources folder.
		model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
		model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	
		modelObject.collider.enabled = false;
 		modelObject.AddComponent(BoxCollider);
		modelObject.GetComponent(BoxCollider).isTrigger = false;
 		modelObject.GetComponent(BoxCollider).size = Vector3(.75,.75,.75);
 		modelObject.AddComponent(Rigidbody);
		modelObject.GetComponent(Rigidbody).isKinematic = false;
 		modelObject.GetComponent(Rigidbody).useGravity = false;
 		modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
 		modelObject.GetComponent(Rigidbody).freezeRotation = true;
 		
 		chargeSound = gameObject.AddComponent("AudioSource") as AudioSource; //Initialized AudioSource
		chargeSound.clip = Resources.Load("Sounds/snort"); //Loads proper clip. In Unity Editor make sure "3D Sound" is UNCHECKED. It's checked by default. MP3s seem to work well and Audacity can export them.

	}
	
	function Update(){
		if(health > 0){
			act();
		}else if (health > -100){
			super.die(1);
			health -= 101;
		}		
	}
	
	function act(){
		model.transform.position.z = 0;
		super.turnToHero();
		if( chargin ){
			charge();
		} else if ( super.distanceToHero() > 3) {
			move(moveSpeed);
			timing = Time.time;
		} else {
			chargin = true;
			turnSpeed = 120;
		}
	}
	
	function charge(){
		if(Time.time - timing > 2.5){
			chargin = false;
			attacked = false;
			turnSpeed = 60;
			timing = Time.time;
		} else if(Time.time - timing > 1.25){
			move(4.5);
		}
		if( super.distanceToHero() < 1 && !attacked){
			super.simpleMelee();
			chargeSound.Play();
			attacked = true;
		}
	}
	
}