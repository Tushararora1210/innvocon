const dimensions = [{ key: 'category' }, { key: 'subcategory' }]
const measures = [{ key: 'sale' }]
const data = [
  {
    category: 'Techonology',
    subcategory: 'laptop',
    sale: 19000,
    profit: 909049,
  },
  {
    category: 'Furniture',
    subcategory: 'badge',
    sale: 2009900,
    profit: 699600,
  },
  {
    category: 'Techonology',
    subcategory: 'chair',
    sale: 30000,
    profit: 500,
  },
  {
    category: 'Furniture',
    subcategory: 'bed',
    sale: 400,
    profit: 200000,
  },
]

function createNode(name){
  let output = {};
  output["name"] = name;
  output["children"] = [];
  return output;
}

let rootNode = createNode("data");

function createTree(rootNode,level,data){
  //level is equal to dimension length ==> leaf nodes to be added
  if(level == dimensions.length){
    measures.forEach((leaf)=>{
      let key = leaf["key"];
      for(let idx = 0; idx < data.length; idx++){
        const leafNode={};
        leafNode["name"] = key;
        leafNode["value"] = data[idx][key];
        rootNode["children"].push(leafNode);
      }
    })
    return rootNode; 
  }

  let key = dimensions[level]["key"];
  let newNodes = new Set();
  for(let idx = 0; idx < data.length; idx++){
    newNodes.add(data[idx][key]);
  }
  newNodes.forEach(function(name){
    let newNode = createNode(name);
    let newData = [];
    for(let i=0;i<data.length;i++){
      if(data[i][key] == name){
        newData.push(data[i]);
      }
    }
    newNode = createTree(newNode,level+1,newData);
    rootNode["children"].push(newNode);

  })
  return rootNode;
  

}

rootNode = createTree(rootNode, 0, data);
console.log(JSON.stringify(rootNode));