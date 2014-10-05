#pragma strict
public class Monster extends MonoBehaviour 
{
	public var model : MonsterModel;
	public var hero : Character;
	public var moveSpeed : float;
	public var turnSpeed : float;

	public function init(c : Character) {
		hero = c;
		var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
		model = modelObject.AddComponent("MonsterModel");						// Add a gemModel script to control visuals of the gem.
		//gemType = 1;
		moveSpeed = 1;
		turnSpeed = 1;
			
		model.transform.parent = transform;									// Set the model's parent to the gem (this object).
		model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
		model.name = "Character Model";											// Name the object.
		model.renderer.material.mainTexture = Resources.Load("Textures/gem1", Texture2D);	// Set the texture.  Must be in Resources folder.
		model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
		model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	}
	
	public function move(){
		transform.Translate(Vector3.up * Time.deltaTime*moveSpeed);
	}
	
	public function move(multiplier : float){
		transform.Translate(Vector3.up * Time.deltaTime*moveSpeed*multiplier);
	}
	public function turnToHero(){
		var referenceRight : Vector3 = Vector3.Cross(Vector3.up, model.transform.eulerAngles);
		var sign : float = Mathf.Sign(Vector3.Dot(model.transform.eulerAngles - hero.model.transform.eulerAngles, referenceRight));
		model.transform.eulerAngles += Vector3(0, 0, turnSpeed * Time.deltaTime * 80);
	}
	
	function Update(){
		turnToHero();
	}
}