#pragma strict
public class Weapon extends MonoBehaviour{
	public var owner : Character;
	public var model : WeaponModel;
	function init(c){
		owner = c;
		var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
		model = modelObject.AddComponent("WeaponModel");						// Add a gemModel script to control visuals of the gem.
			
		model.transform.parent = owner.model.transform;									// Set the model's parent to the gem (this object).
		model.transform.localPosition = Vector3(0,1,0);						// Center the model on the parent.
		model.name = "Weapon Model";											// Name the object.
		model.renderer.material.mainTexture = Resources.Load("Textures/stick2", Texture2D);	// Set the texture.  Must be in Resources folder.
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
 }