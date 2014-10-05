function init(color:int) { // 0 for blue, 1 for red, 2 for yellow
	enabled = false;
	//model = modelObject.AddComponent("CharacterModel");						// Add a gemModel script to control visuals of the gem.
	//gemType = 1;

//	modelObject.transform.parent = this.transform;

	//this.name = "Color Circle";		
	
	if (color == 0){
			this.name = "Blue";											// Name the object.
			this.renderer.material.mainTexture = Resources.Load("Textures/bluecircle", Texture2D);	// Set the texture.  Must be in Resources folder.
			this.transform.position = Vector3(3, 3, 1);	
	}
	else if (color == 1){
		this.name = "Red";											// Name the object.
		this.renderer.material.mainTexture = Resources.Load("Textures/redcircle", Texture2D);	// Set the texture.  Must be in Resources folder.
		this.transform.position = Vector3(0, 3, 1);	
	
	}
	else if (color == 2){
		this.name = "Yellow";											// Name the object.
		this.renderer.material.mainTexture = Resources.Load("Textures/yellowcircle", Texture2D);	// Set the texture.  Must be in Resources folder.
		this.transform.position = Vector3(-3, 3, 1);	
	
	}
	this.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	this.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	/*model.name = "ColorCircle Model";											// Name the object.
	model.renderer.material.mainTexture = Resources.Load("Textures/train1", Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
*/	enabled = true;
}

function Update(){



}
