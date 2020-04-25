
import $ from 'jquery'
import "./materialize.min.js"




const toDos= [
    'Закончить писать книгу',
    'Вывести собаку на прогулку',
    'Ответить на емейлы',
    'Сделать ченибудь еще',
    'Купить продукты',
    'Еще какое-то задание'
  ]
    


var main = function(){
    'use strict'
       //////////////////////////////////////////////////
       $('.btn-center').on('click', function(){
        $('.content').slideUp(700) 
      })
     ////////////////////////////////////////// 
      
      var textArea = $('.text-area') 
      textArea.on('keypress', function(e){
        
        if(e.code === "Enter"){  
            var text = textArea.val()
            toDos.push(text.toString())
            e.preventDefault() 
              toDos.forEach(function(item){
                    textArea.val("")
              })
        }
      })
      
    
      var oldTabView = function(e){  
        var ulOld = $('.oldTodos').empty()
          toDos.forEach(function(item){
          ulOld.append($(`<li>${item}</li>`))
      })
    } 
    var newTabView = function(e){
      var ul = $('.newTodos').empty()
      toDos.forEach(function(item){
        ul.prepend($(`<li>${item}</li>`))
      })
    }
    ///////////////////////////////////////////////
    var tab = $('.tab')
    
     tab.on('click', function(e){
      let par = e.target.dataset.par
      console.log(par)
        if(par === "new" ){
          newTabView()    
        }
        if(par === "old" ){
          oldTabView()
      }
    })
    
    $.getJSON("json/bd.json", function(card){
        var $cardParagraph = $("<p>")
        $cardParagraph.text(card.rank + " of " + card.suit)
        $('main').append($cardParagraph)
        console.log(card) 
    })
    $.getJSON("json/hand.json", function(hand){
        var $list = $("<ul>")
        hand.forEach(function(card){
            var $card = $("<li>")
            $card.text(card.rank + " of " + card.suit)
            $list.append($card)
        })
        $("main").append($list)
    })
    
    var url = "https://api.flickr.com/services/feeds/photos_public.gne?"+
    "tags=cat&format=json&jsoncallback=?"
    $.getJSON(url, function(flickrResponse){
        flickrResponse.items.forEach(function (photo){
            var $img = $("<img>")
            
            $img.attr("src", photo.media.m)
            $("main .carousel").append($img)
        })
    })
    
}
$(document).ready(function(){
    
    main()
    $('.collapsible').collapsible();
    $('.tabs').tabs();
    oldTabView()
    newTabView()
   
  });