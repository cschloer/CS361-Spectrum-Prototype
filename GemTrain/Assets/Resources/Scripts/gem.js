var model : gemModel;

function init(gemType : int) {
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
	model = modelObject.AddComponent("gemModel");						// Add a gemModel script to control visuals of the gem.
	model.gemType = gemType;
	
	model.transform.parent = transform;									// Set the model's parent to the gem (this object).
	model.transform.localPosition = Vector3(0,0,0);						// Center the model on the parent.
	model.name = "Gem Model";											// Name the object.
	
	model.renderer.material.mainTexture = Resources.Load("Textures/gem"+gemType, Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
}

