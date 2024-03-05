const UserModel = require("../model/register");
const product=require("../model/products");
const wishlist=require("../model/wishlist")



module.exports = {
  home:async (req, res) => {
    try{
      if(req.session.userId){
        let products = await product.find().limit(3)
        res.render("user/userHomePage",{products})
      }else{
        res.redirect("/")
      }
    }catch (error){
      console.log(error);
    }
  },  
  detailedProduct:async(req, res) => {
    try{
      if(req.session.userId){
        const userid=req.session.userId
        let productId=req.params.id
        let wishlistData=await wishlist.findOne({user:userid,product:productId})
        let wishlistId;
        if(wishlistData){
          wishlistData.product.forEach((data) => {
            if(data==productId){
              wishlistId=productId;
            }
          });
          if(!wishlistData){0
            wishlistId=null;
          }
        }
        let data = await product.findById(productId)
        res.render("user/productDetailPage",{data, wishlistId})
      }else{
        res.redirect("/")
      }
    }catch (error){
      console.log(error);
    }
  },
  addToWishlist:async (req,res)=>{
    try {
      if(req.session.userId){
        const id=req.params.id
        const userId=req.session.userId
        const checkUser=await wishlist.findOneAndUpdate(
          {user:userId},
          { $push:{product:id}},
          {upsert:true, new:true}
          )
          console.log(checkUser)
          if(checkUser){
            res.status('200').json({message: "Added to WishList"});
          }else{
            res.status('401').json({message:"Please Login First!"});
          }
        }
    } catch (error) {
      console.log(error)
    }
  },
  wishlist:async (req, res) => {
    try {
      if(req.session.userId){
      let products=[];
      const userId=req.session.userId
      const data=await wishlist.findOne({user:userId})
      for (let i of data.product) {
        const item=await product.findById(i)
        products.push(item)
      }
      console.log(products,"djljflfjd");
      res.render("user/wishlist",{products})
      }else{
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  },
  category:async (req, res) => {
    if(req.session.userId){
      const category = req.params.category;
      console.log(category);
      const categorizedDetails=await product.find({category:category})
      res.status(200).render("user/userSingleProductPage",{data:categorizedDetails})
    }else{
      res.redirect('/');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
  },
};
