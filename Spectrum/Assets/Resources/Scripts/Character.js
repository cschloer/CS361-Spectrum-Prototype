﻿var model : CharacterModel;
var weapon : Weapon;
var hurtRecovery : float;
var hurting : boolean;
var health : int;
var modelObject : GameObject;
function init(m) {
	health = 3;
	hurtRecovery = .5;
	enabled = false;
	modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
	model = modelObject.AddComponent("CharacterModel");						// Add a gemModel script to control visuals of the gem.
	//gemType = 1;
	modelObject.collider.enabled = false;
	modelObject.AddComponent(BoxCollider);
	modelObject.GetComponent(BoxCollider).name = "Box1";
	modelObject.GetComponent(BoxCollider).isTrigger = false;
	modelObject.GetComponent(BoxCollider).size = Vector3(.5,.5,10);
	modelObject.AddComponent(Rigidbody);
	modelObject.GetComponent(Rigidbody).isKinematic = false;
	modelObject.GetComponent(Rigidbody).useGravity = false;
	modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
	modelObject.GetComponent(Rigidbody).freezeRotation = true;
	modelObject.AddComponent(Animation);

		
	model.character = this;			
	model.transform.parent = transform;									// Set the model's parent to the gem (this object).
	model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
	model.name = "Character Model";											// Name the object.
	model.renderer.material.mainTexture = Resources.Load("Textures/CharTemp", Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency
	model.Manager = m;
	model.modelObject = modelObject;
	enabled = true;
}
public function hurt(){
		health--;
		hurting = true;
		var before = model.renderer.material.color;
		model.renderer.material.color = Color(.5,.5,.5);

		var t : float = hurtRecovery;
		while (t > 0){
			t -= Time.deltaTime;
			yield;
		}
		hurting = false;
		model.renderer.material.color = before;

	}

function setWeapon(w : Weapon){
	weapon = w;
}

