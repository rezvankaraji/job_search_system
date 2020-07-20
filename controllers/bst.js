//binary search tree class

class Node 
{ 
    constructor(data) 
    { 
        this.key = data.user_id; 
        this.value = data.salary
        this.left = null; 
        this.right = null; 
    } 
} 

class BinarySearchTree 
{ 
    constructor() 
    { 
        this.root = null; 
    } 
  
    insert(data) 
    { 
    
        let new_node = new Node(data); 
        if(this.root === null) 
            this.root = new_node; 
        else
            this.insert_node(this.root, new_node); 
    } 
  
    insert_node(node, new_node) 
    { 
        if(new_node.value < node.value) 
        { 
            if(node.left === null) 
                node.left = new_node; 
            else  
                this.insert_node(node.left, new_node);  
        } else
        { 
            if(node.right === null) 
                node.right = new_node; 
            else
                this.insert_node(node.right, new_node); 
        } 
    } 

    remove(data) 
    { 
        let value = data.salary;
        this.root = this.remove_node(this.root, value); 
    } 

    remove_node(node, value) 
    {
        if(node === null) 
            return null; 
      
        else if(value < node.value) 
        { 
            node.left = this.remove_node(node.left, value); 
            return node; 
        } else if(value > node.value) 
        { 
            node.right = this.remove_node(node.right, value); 
            return node; 
        } else
        { 
            if(node.left === null && node.right === null) 
            { 
                node = null; 
                return node; 
            } else if(node.left === null) 
            { 
                node = node.right; 
                return node; 
            } else if(node.right === null) 
            { 
                node = node.left; 
                return node; 
            } 

            var alternative = this.find_min_node(node.right); 
            node.value = alternative.value; 
            node.key = alternative.key;
      
            node.right = this.remove_node(node.right, alternative.value); 
            return node; 
        }  
    } 

    find_min_node(node) 
    { 
        if(node.left === null) 
            return node; 
        else
            return this.find_min_node(node.left); 
    } 
  
    
    
} 