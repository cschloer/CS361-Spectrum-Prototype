// Tom Wexler
// Example program to help you get started with your project.


var gemFolder : GameObject;	// This will be an empty game object used for organizing objects in the hierarchy pane.
var gems : Array;			// This array will hold the gem objects that are created.
var gemType : int; 		// The next gem type to be created.



// Called once when the script is created.
function Start () {
	gemFolder = new GameObject();  
	gemFolder.name = "Gems";
	gems = new Array();
	gemType = 1;
}

// Called every frame.
function Update () {
	if (Input.GetMouseButtonUp(0)) { // If the user releases the mouse button, figure out where the mouse is and spawn a gem.
		var worldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		var mouseX = worldPos.x;
		var mouseY = worldPos.y;
		print("you just clicked at "+mouseX+" "+mouseY);
		addGem(mouseX, mouseY);
	}
}

function addGem(x : float , y : float) {
	var gemObject = new GameObject();					// Create a new empty game object that will hold a gem.
	var gemScript = gemObject.AddComponent("gem");		// Add the gem.js script to the object.
														// We can now refer to the object via this script.
	gemScript.transform.parent = gemFolder.transform;	// Set the gem's parent object to be the gem folder.
	gemScript.transform.position = Vector3(x,y,0);		// Position the gem at x,y.								
	
	gemScript.init(gemType);							// Initialize the gem script.
	
	gems.Add(gemScript);								// Add the gem to the gems array for future access.
	gemScript.name = "Gem "+gems.length;				// Give the gem object a name in the Hierarchy pane.
	
	gemType = (gemType%4) + 1;							
}

function OnGUI () {
	if (GUI.Button (Rect (10,400,100,30), "Self Destruct")) 
		print("omg you pressed a button"); 
		// Printing goes to the Console pane.  
		// If an object doesn't extend monobehavior (it will by default, but not if you define your own class), calling print won't do anything.  
		// Make sure "Collapse" isn't selected in the Console pane if you want to see duplicate messages.
}