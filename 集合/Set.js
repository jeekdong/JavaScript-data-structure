function Set() {

    var items = {};

    this.add = function(value){
        if (!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    };

    this.remove = function(value){
        if (this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    };

    this.has = function(value){
        return items.hasOwnProperty(value);
        //return value in items;
    };

    this.clear = function(){
        items = {};
    };

    /**
     * 现代浏览器的实现
     * IE9+, FF4+, Chrome5+, Opera12+, Safari5+
     */
    this.size = function(){
        return Object.keys(items).length;
    };

    /**
     * 兼容早期浏览器
     */
    this.sizeLegacy = function(){
        var count = 0;
        for(var prop in items) {
            if(items.hasOwnProperty(prop))
                ++count;
        }
        return count;
    };

    /**
     * 现代浏览器的实现
     * IE9+, FF4+, Chrome5+, Opera12+, Safari5+
     */
    this.values = function(){
        return Object.keys(items);
    };

    this.valuesLegacy = function(){
        var keys = [];
        for(var key in items){
            keys.push(key);
        }
        return keys;
    };

    this.getItems = function(){
      return items;
    };

    this.union = function(otherSet){
        var unionSet = new Set(); //{1}

        var values = this.values(); //{2}
        for (var i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }

        values = otherSet.values(); //{3}
        for (var i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }

        return unionSet;
    };

    this.intersection = function(otherSet){
        var intersectionSet = new Set(); //{1}

        var values = this.values();
        for (var i=0; i<values.length; i++){ //{2}
            if (otherSet.has(values[i])){    //{3}
                intersectionSet.add(values[i]); //{4}
            }
        }

        return intersectionSet;
    };

    this.difference = function(otherSet){
        var differenceSet = new Set(); //{1}

        var values = this.values();
        for (var i=0; i<values.length; i++){ //{2}
            if (!otherSet.has(values[i])){    //{3}
                differenceSet.add(values[i]); //{4}
            }
        }

        return differenceSet;
    };

    this.subset = function(otherSet){

        if (this.size() > otherSet.size()){ //{1}
            return false;
        } else {
            var values = this.values();
            for (var i=0; i<values.length; i++){ //{2}
                if (!otherSet.has(values[i])){    //{3}
                    return false; //{4}
                }
            }
            return true;
        }
    };
}