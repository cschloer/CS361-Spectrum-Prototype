// CAGE
// CSCI 361 Prototype

// tileFloorModel
// Blank uninteractive floor tile

var owner : Tile;

function init(own : Tile) {
	owner = own;									// Set up a pointer to the marble object containing this model.
	
	transform.parent = owner.transform;				// Set the model's parent to the gem (this object).
	transform.localPosition = Vector3(0,0,0);		// Center the model on the parent.
	name = "Tile Wall Model";						// Name the object.
	
	
	renderer.material.mainTexture = Resources.Load("Textures/Wall", Texture2D);			// Set the texture.  Must be in Resources folder.
	renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	//renderer.sortingLayerID = 2;														// Set the Unit to the tile layer.
	//renderer.sortingOrder = 2;
	
}


function OnDrawGizmos () {
		// Draw a yellow cube at the transforms position
		Gizmos.color = Color.yellow;
		Gizmos.DrawWireCube (transform.position, owner.modelObject.GetComponent(BoxCollider).size);
}