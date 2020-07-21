//binary search tree class

class Node 
{ 
    constructor(data, value) 
    { 
        this.data = data; 
        this.value = value;
        this.left = null; 
        this.right = null; 
        this.flag = 0;
    } 
} 

class binary_search_tree 
{ 
    constructor() 
    { 
        this.root = null; 
    } 
  
    insert(data, value) 
    { 
    
        let new_node = new Node(data, value); 
        if(this.root === null) 
            this.root = new_node; 
        else
            this.insert_node(this.root, new_node); 
    } 
  
    insert_node(root, new_node) 
    { 
        if(new_node.value < root.value) 
        { 
            if(root.left === null) 
                root.left = new_node; 
            else  
                this.insert_node(root.left, new_node);  
        } else
        { 
            if(root.right === null) 
                root.right = new_node; 
            else
                this.insert_node(root.right, new_node); 
        } 
    } 

    remove(data, value) 
    { 
        let value = value;
        this.root = this.remove_node(this.root, value); 
    } 

    remove_node(root, value) 
    {
        if(root === null) 
            return null; 
      
        else if(value < root.value) 
        { 
            root.left = this.remove_node(root.left, value); 
            return root; 
        } else if(value > root.value) 
        { 
            root.right = this.remove_node(root.right, value); 
            return root; 
        } else
        { 
            if(root.left === null && root.right === null) 
            { 
                root = null; 
                return root; 
            } else if(root.left === null) 
            { 
                root = root.right; 
                return root; 
            } else if(root.right === null) 
            { 
                root = root.left; 
                return root; 
            } 

            var alternative = this.find_min_node(root.right); 
            root.value = alternative.value; 
            root.data = alternative.data;
      
            root.right = this.remove_node(root.right, alternative.value); 
            return root; 
        }  
    } 

    find_min_node(root) 
    { 
        if(root.left === null) 
            return root; 
        else
            return this.find_min_node(root.left); 
    } 
    
    get_nodes_in(min, max)
    {
        let nodes = [];
        return this.get_nodes(nodes, this.root, min, max);
    }

    get_nodes(nodes, root, min, max)
    {
        if(root.value <= min)
        {   
            if(root.value === min)
                nodes.push(root);
            if(root.right !== null)
                this.get_nodes(nodes, root.right, min, max);
        }else if(root.value >= max)
        {   
            if(root.value === max)
                nodes.push(root);
            if(root.left !== null)
                this.get_nodes(nodes, root.left, min, max);
        }else
        {
            nodes.push(root);
            this.get_nodes(nodes, root.right, root.value, max);
            this.get_nodes(nodes, root.left, min, root.value);
        }
        return nodes;
    }  
}

module.exports = binary_search_tree;