// Gabe Fishel
// CSCI 361 Mechanics

// tile
// todo: floor tiles, wall tiles, cliff tiles, fall tiles.

var model : TileFloorModel;		// The child object that is quad with tile texture.
var modelObject : GameObject; 
var box : BoxCollider;			// For walls and cliffs

function init(type: String) {
	modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);		// Create a quad object for holding the unit texture.
	modelObject.collider.enabled = false;								// Turn off MeshCollider
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	model = modelObject.AddComponent("TileFloorModel");					// Add a script to control direction of the unit.
	box = modelObject.AddComponent("BoxCollider");						// Add boxcollider.
	box.center = model.transform.position;								// Center the boxcollider on the unit.
	box.size = Vector3(1,1,1);
	box.isTrigger = true;
	model.init(this);													// Initialize the tileModel.
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
}