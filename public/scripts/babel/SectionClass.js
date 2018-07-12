'use strict';
(function(){
    class Section {
        constructor (sections){
            this.sections=sections;
            this.categories=sections.reduce(function (a,s) {
                s.categoriesO={}
                if(s.categories){
                    s.categories.forEach(function(cat){
                        a[cat.url]=cat;
                        s.categoriesO[cat.url]=cat;
                    })
                }
                if(s.child){
                    s.child.forEach(function (c) {
                        c.categoriesO={}
                        if(c.categories){
                            c.categories.forEach(function(cat){
                                a[cat.url]=cat
                                c.categoriesO[cat.url]=cat;
                            })
                        }
                    })
                }
                return a;
            },{})
        }
        getSections(){
            return this.sections;
        }
        getCategories(){
            return this.categories;
        }
        getSection(sectionUrl) {
            //console.log('sectionUrl',sectionUrl)
            if(!this.sections) return  null;
            let sections=this.sections;
            for(var i=0,l=sections.length;i<l;i++){
                //console.log('sections[i].url',sections[i].url)
                if(sections[i].url && sections[i].url==sectionUrl){
                    return sections[i];
                    break
                }
                if (sections[i].child && sections[i].child.length){
                    for(var j=0,ll=sections[i].child.length;j<ll;j++){
                        if(sections[i].child[j].url && sections[i].child[j].url==sectionUrl){
                            return sections[i].child[j];
                            break
                        }
                    }
                }
            }
            return null;
        }
        getParentSection(sectionUrl,id){
            //console.log(sectionUrl)
            if(!this.sections) return  null;
            let sections=this.sections;
            for(var i=0,l=sections.length;i<l;i++){
                if(id){
                    if(sections[i]._id==sectionUrl){
                        return sections[i];
                        break
                    }
                }else{
                    if(sections[i].url && sections[i].url==sectionUrl){
                        return sections[i];
                        break
                    }
                }

                if (sections[i].child && sections[i].child.length){
                    var categories;
                    if(categories=_getParentSection(sections[i].child,sectionUrl,id)){
                        return categories;
                        break;
                    }
                }
            }
            return null;
        }

        getEmbededCategories(section,arr){
            if(section.categories && section.categories.length){
                arr.push.apply(arr,section.categories);
            }
            if (section.child && section.child.length){
                section.child.forEach(function(child,i){
                    arr.push.apply(arr,section.child[i].categories);
                })
            }
            return arr;
        }
        getListType(params){
            if(!params.group){
                return 'good'
            }
            for(let i=0;i<this.sections.length;i++){
                if(this.sections[i].url==params.group){
                    if(this.sections[i].type){
                        return this.sections[i].type;
                        break;
                    }
                }
                if(this.sections[i].child && this.sections[i].child.length){
                    for(let j=0;j<this.sections[i].child.length;j++){
                        if(this.sections[i].child[j].url==params.group){
                            if(this.sections[i].type){
                                return this.sections[i].type;
                                break;
                            }
                        }
                    }
                }
            }
            return 'good'
        }
    }

    if(typeof window !== 'undefined'){
        window.SectionClass = Section;
    } else {
        exports.init=Section;
    }
})()