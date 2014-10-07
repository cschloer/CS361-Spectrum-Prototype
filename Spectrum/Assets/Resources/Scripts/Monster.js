#pragma strict
public class Monster extends MonoBehaviour 
{
	public var model : MonsterModel; //The model for this monster
	public var hero : Character; //Pointer to the hero
	public var moveSpeed : float;  //Tiles per second
	public var turnSpeed : float;  //Degrees Per second
	public var health : int; //Max/starting health
	public var hurtRecovery : float; //Time spend invincible after hit
	public var hurting : boolean; //Marker boolean for whether it was just hurt
	public var modelObject : GameObject;

	public function init(c : Character) {
		hero = c;
		hurting = false;
		health = 3;
		hurtRecovery = .6;
		modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
		model = modelObject.AddComponent("MonsterModel");						// Add a gemModel script to control visuals of the gem.
		model.monster = this;
		//gemType = 1;
		moveSpeed = 1;
		turnSpeed = 90;
			
		model.transform.parent = transform;									// Set the model's parent to the gem (this object).
		model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
		model.name = "Character Model";											// Name the object.
		model.renderer.material.mainTexture = Resources.Load("Textures/gem1", Texture2D);	// Set the texture.  Must be in Resources folder.
		model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
		model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	
		modelObject.collider.enabled = false;
 		modelObject.AddComponent(BoxCollider);
		modelObject.GetComponent(BoxCollider).isTrigger = false;
 		modelObject.GetComponent(BoxCollider).size = Vector3(.5,.5,10);
 		modelObject.AddComponent(Rigidbody);
		modelObject.GetComponent(Rigidbody).isKinematic = false;
 		modelObject.GetComponent(Rigidbody).useGravity = false;
 		modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
 		modelObject.GetComponent(Rigidbody).freezeRotation = true;
	}
	
	//Move forward at default speed
	public function move(){
		move(1);
	}
	//Move forward at given speed factor
	public function move(multiplier : float){
		model.transform.position += model.transform.up * Time.deltaTime*moveSpeed*multiplier;
		
	}
	
	//Move backward at default speed
	public function moveBack(){
		moveBack(1);
	}
	//Move backward at given speed factor
	public function moveBack(multiplier : float){
		model.transform.position += -1*model.transform.up * Time.deltaTime*moveSpeed*multiplier;
	}
	
	//Strafe left
	public function moveLeft(){
		moveLeft(1);
	}
	//Strafe left at given speed
	public function moveLeft(multiplier : float){
		model.transform.position += -1*model.transform.right * Time.deltaTime*moveSpeed*multiplier;
	}
	//Strafe right
	public function moveRight(){
		moveRight(1);
	}
	//Strafe right at given speed
	public function moveRight(multiplier : float){
		model.transform.position += 1*model.transform.right * Time.deltaTime*moveSpeed*multiplier;
	}
	//Strafe toward hero at given speed
	public function moveTowardHero(m : float){
		var toHero : Vector3 = hero.model.transform.position - model.transform.position;
		model.transform.position += toHero.normalized * Time.deltaTime*moveSpeed * m;
	}
	//Strafe toward hero at default speed
	public function moveTowardHero(){
		moveTowardHero(1);
	}
	
	//Strafe away from hero at given speed
	public function moveFromHero(m : float){
		var toHero : Vector3 = hero.model.transform.position - model.transform.position;
		model.transform.position += toHero.normalized * Time.deltaTime*moveSpeed * m * -1;
	}
	
	//Strafe away from hero at default speed
	public function moveFromHero(){
		moveFromHero(1);
	}
	
	//Rotate right (clockwise) at given speed
	public function turnRight(m : float){
		model.transform.eulerAngles += Vector3(0, 0, Time.deltaTime * turnSpeed * m * -1);
	}
	public function turnRight(){
		turnRight(1);
	}
	
	//Rotate left (counterclockwise) at given speed
	public function turnLeft(m : float){
		model.transform.eulerAngles += Vector3(0, 0, Time.deltaTime * turnSpeed * m * 1);
	}
	public function turnLeft(){
		turnLeft(1);
	}
	//Calculates distance from (center of) monster to hero
	public function distanceToHero(){
		return Vector3.Magnitude(model.transform.position - hero.model.transform.position);
	}

	//Gives an angle (in degrees) of the monster's radial position based on the hero's orientation. 0 is in front of hero, 180 is behind.
	//Good for monsters getting behind hero
	public function heroAngle(){
		var vectorToHero : Vector3 = model.transform.position - hero.model.transform.position;
		var anglesToHero : float = Mathf.Atan2(vectorToHero.y, vectorToHero.x) * Mathf.Rad2Deg - 90;
		var num : float = anglesToHero - hero.model.transform.eulerAngles.z;
		return num % 360 + 360;
	}
	//Rotates toward hero at given speed
	public function turnToHero(multiplier : float){
		var vectorToHero : Vector3 = model.transform.position - hero.model.transform.position;
		var anglesToHero : float = Mathf.Atan2(vectorToHero.y, vectorToHero.x) * Mathf.Rad2Deg - 90;
		if (anglesToHero < 0) anglesToHero += 360;
		//print("AnglestoHero: " + anglesToHero + ", Z: " + model.transform.eulerAngles.z);
		var sign : float = -1;
		if((model.transform.eulerAngles.z + (360-anglesToHero)) % 360 < 180) sign = 1;
		model.transform.eulerAngles += Vector3(0, 0, Time.deltaTime * turnSpeed * sign * multiplier);
	}
	public function turnToHero(){
		turnToHero(1);
	}
	
	
	
	//Subroutine - call once, runs concurrently.
	public function flee(speed : float, duration : float){
		var t : float = 0;
		while(t < duration && health > 0){
			t += Time.deltaTime;
			moveFromHero(speed);
			yield;
		}
	}
	
	//Subroutine - call once, runs concurrently.
	public function hurt(){
		flee(2, hurtRecovery); //Might want to be taken out and added only for specific monsters (by overriding hurt)
		health--;
		hurting = true;
		model.renderer.material.color = Color(.5,.5,.5);

		var t : float = hurtRecovery;
		while (t > 0 && health > 0){
			t -= Time.deltaTime;
			yield;
		}
		hurting = false;
		model.renderer.material.color = Color(1,1,1);

			
	}
	

	function Update(){
		if(health > 0){
			act();
		}else if (health > -100){
			die(1);
			health -= 101;
		}		
	}
	function die(deathTime : float){
		var t : float = 0;
		while (t < deathTime){
			t += Time.deltaTime;
			model.renderer.material.color.a = 1-(t/deathTime);
			yield;
		}
		Destroy(modelObject);
	}
	function act(){
		model.transform.position.z = 0;
		circlingBehaviour(2);
		if(Random.value > .99){
			simpleBullet();
		}
	}
	//A generic attack. 
	//Range is distance attack travels before disappearing.
	//Speed is the movement speed of the attack.
	//If home is more than zero the projectile homes toward the hero (the higher the number the more accurate the homing).
	//Width and depth are bullet dimensions. 
	//If fade is true, attack becomes translucent as it moves.
	//If destructible is true, the sword can destroy the bullets.
	//Keywords can be used for specific hit behaviours (stun, slow, knockback, etc) to be implemented in CharacterModel's (or WeaponModel's) OnTriggerEnter.
	function attack(range : float, speed : float, home : float, width :float, depth : float, color : Color, destructible : boolean, fade : boolean, keyword : String){
		var attackObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	
		var attack : MonsterAttack = attackObject.AddComponent("MonsterAttack");						
		attack.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
		attack.transform.position = model.transform.position;
		attack.transform.rotation = model.transform.rotation;
		attack.name = "Monster Attack";											// Name the object.
		attack.renderer.material.mainTexture = Resources.Load("Textures/ball", Texture2D);	// Set the texture.  Must be in Resources folder.
		attack.renderer.material.color = color;												// Set the color (easy way to tint things).
		attack.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
		attack.transform.localScale = Vector3(width,depth,1); 
		attack.init(range, speed, fade, home);
		attack.hero = hero;

		attackObject.collider.enabled = false;
		attackObject.AddComponent(BoxCollider);
		attackObject.GetComponent(BoxCollider).name = "attack d:" + destructible + " " + keyword;
		attackObject.GetComponent(BoxCollider).isTrigger = true;
		attackObject.GetComponent(BoxCollider).size = Vector3(.5,.5,10);
		attackObject.AddComponent(Rigidbody);
		attackObject.GetComponent(Rigidbody).isKinematic = false;
		attackObject.GetComponent(Rigidbody).useGravity = false;
		attackObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
		attackObject.GetComponent(Rigidbody).freezeRotation = true;
	}
	
	//An example behaviour. Monster maintains constant distance and circles around hero, facing it.
	public function circlingBehaviour(distance : float){
		moveRight();
		turnToHero();
		if(distanceToHero() > distance){
			move();
		} else {
			moveBack();
		}
	}
	//Example melee attack
	function simpleMelee(){
		attack(1, 4, 0, 1, .2, Color(1, 1, 1), false, true, "melee");
	}
	//Example ranged attack
	function simpleBullet(){
		attack(5, 2.5, .5, .3, .3, Color(1, 0, 1),true, false, "bullet");
	}
	
	
}