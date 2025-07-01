import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
    {
        cat_name: {
            type: String,
            default: "",
            // required:true
        },
        subcat_name: {
            type: String,
            default: "",
            // required:true
        },
        generices: {
            type: String,
            default: "",
            // required:true
        },
        product_code: {
            type: String,
            unique: true,
        },
        product_name: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: "",
        },
        genericname: {
            type: String,
            default: "",
        },
        brand: {
            type: String,
            default: "",
        },
        manufactuer: {
            type: String,
            default: "",
        },
        manufactueraddress: {
            type: String,
            default: "",
        },
        tabscount: {
            type: String,
            default: "",
        },
        strength: {
            type: String,
            default: "",
        },
        packageName: {
            type: String,
            default: "",
        },
        price: {
            type: String,
            default: "",
        },
        form: {
            type: String,
            default: "",
        },
        product_img: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        disclaimer: {
            type: String,
            default: "",
        },
        stock: {
            type: String,
            default: "",
        },
        saleprice: {
            type: String,
            default: "",
        },
        percentage: {
            type: String,
            default: "",
        },
        rexrequired: {
            type: String,
            default: "",
        },
        orgin: {
            type: String,
            default: "",
        },
        storage: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"]
        },
        writebyid: {
            type: String,
            default: "",
        },
        reviewbyid: {
            type: String,
            default: "",
        },
        faqs: {
            type: String,
            default: "",
        },
        reference: {
            type: String,
            default: "",
        },
        metatitle: {
            type: String,
            default: "",
        },
        metakeyword: {
            type: String,
            default: "",
        },
        metadesc: {
            type: String,
            default: "",
        },
        varient: {
            type: String,
            default: "",
        },
        imagealt: {
            type: String,
            default: "",
        },
        vedio: {
            type: String,
            default: "",
        },
        vedioalt: {
            type: String,
            default: "",
        },
        userupdate: {
            type: String,
            default: "",
        },
        updatetimestamp: {
            type: String,
            default: "",
        },
        userid: {
            type: String,
            default: "",
        },
        date: {
            type: String,
            default: "",
        },
        referwebsite: {
            type: String,
            default: "",
        },
        keybenefits: {
            type: String,
            default: "",
        },
        keyingredients: {
            type: String,
            default: "",
        },
        expires: {
            type: String,
            default: "",
        },
        usesofmeds: {
            type: String,
            default: "",
        },
        useofbenefits: {
            type: String,
            default: "",
        },
        indicat: {
            type: String,
            default: "",
        },
        machanism: {
            type: String,
            default: "",
        },
        medicinework: {
            type: String,
            default: "",
        },
        contraindications: {
            type: String,
            default: "",
        },
        sideeffects: {
            type: String,
            default: "",
        },
        faqs: {
            type: String,
            default: "",
        },
        pregnancy: {
            type: String,
            default: "",
        },
        breastfeeding: {
            type: String,
            default: "",
        },
        kidneyproblem: {
            type: String,
        },
        liverdisease: {
            type: String,
            default: "",
        },
        heartdisease: {
            type: String,
            default: "",
        },
        asthma: {
            type: String,
            default: "",
        },
        takemedicine: {
            type: String,
            default: "",
        },
        adult: {
            type: String,
            default: "",
        },
        childrenmed: {
            type: String,
            default: "",
        },
        elderlymed: {
            type: String,
            default: "",
        },
        alcohol: {
            type: String,
            default: "",
        },
        driving: {
            type: String,
            default: "",
        },
        warnings: {
            type: String,
            default: "",
        },
        talkdoctor: {
            type: String,
            default: "",
        },
        instructions: {
            type: String,
            default: "",
        },
        druginteraction: {
            type: String,
            default: "",
        },
        drugfood: {
            type: String,
            default: "",
        },
        drugdiease: {
            type: String,
            default: "",
        },
        fooditems: {
            type: String,
            default: "",
        },
        overdose: {
            type: String,
            default: "",
        },
        misseddose: {
            type: String,
            default: "",
        },
        disposal: {
            type: String,
            default: "",
        },
        fasttag: {
            type: String,
            default: "",
        },
        refer: {
            type: String,
            default: "",
        },
        ingredients: {
            type: String,
            default: "",
        },
        direction: {
            type: String,
            default: "",
        },
        dosages: {
            type: String,
            default: "",
        },
        precaution: {
            type: String,
            default: "",
        },
        prostatus: {
            type: String,
            default: "",
        },
        paymenttype: {
            type: String,
            default: "",
        },
        retunpolicy: {
            type: String,
            default: "",
        },
        gst: {
            type: String,
            default: "",
        },
        hsn: {
            type: String,
            default: "",
        },
        product_type: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
)

productSchema.pre("save", async function (next) {
  if (!this.product_code) {
    try {
      const lastScan = await mongoose
        .model("Product")
        .findOne({}, {}, { sort: { product_code: -1 } });

      let newNumber = 97; // Default start number

      if (lastScan && lastScan.product_code) {
        const match = lastScan.product_code.match(/\d+$/); // extract numeric part
        if (match) {
          newNumber = parseInt(match[0], 10) + 1;
        }
      }

      const paddedNumber = String(newNumber).padStart(4, "0"); // 0097 → 0098 → 0099 → ...
      this.product_code = `DC-MA${paddedNumber}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema, "product");

export default Product;
