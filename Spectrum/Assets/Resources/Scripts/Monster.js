#pragma strict
public class Monster extends MonoBehaviour 
{
	public var model : MonsterModel;
	public var hero : Character;
	public var moveSpeed : float;  //Tiles per second
	public var turnSpeed : float;  //Degrees Per second

	public function init(c : Character) {
		hero = c;
		var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
		model = modelObject.AddComponent("MonsterModel");						// Add a gemModel script to control visuals of the gem.
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
		modelObject.GetComponent(BoxCollider).isTrigger = true;
 		modelObject.GetComponent(BoxCollider).size = Vector3(.5,.5,.5);
 		modelObject.AddComponent(Rigidbody);
		modelObject.GetComponent(Rigidbody).isKinematic = true;
 		modelObject.GetComponent(Rigidbody).useGravity = false;
 		modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
	}
	
	public function move(){
		move(1);
	}
	
	public function move(multiplier : float){
		transform.position += model.transform.up * Time.deltaTime*moveSpeed*multiplier;
	}
	public function moveBack(){
		moveBack(1);
	}
	
	public function moveBack(multiplier : float){
		transform.position += -1*model.transform.up * Time.deltaTime*moveSpeed*multiplier;
	}
	public function moveLeft(){
		moveLeft(1);
	}
	
	public function moveLeft(multiplier : float){
		transform.position += -1*model.transform.right * Time.deltaTime*moveSpeed*multiplier;
	}
	
	public function moveRight(){
		moveRight(1);
	}
	
	public function moveRight(multiplier : float){
		transform.position += 1*model.transform.right * Time.deltaTime*moveSpeed*multiplier;
	}
	public function turnRight(m : float){
		model.transform.eulerAngles += Vector3(0, 0, Time.deltaTime * turnSpeed * m * -1);
	}
	public function turnRight(){
		turnRight(1);
	}
	
	public function turnLeft(m : float){
		model.transform.eulerAngles += Vector3(0, 0, Time.deltaTime * turnSpeed * m * 1);
	}
	public function turnLeft(){
		turnLeft(1);
	}
	
	public function distanceToHero(){
		return Vector3.Magnitude(model.transform.position - hero.model.transform.position);
	}

		
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
	
	function Update(){
		circlingBehaviour(2);
	}
	
	public function circlingBehaviour(distance : float){
		moveRight();
		turnToHero();
		if(distanceToHero() > distance){
			move();
		} else {
			moveBack();
		}
	}
	
}