import { adminAuthorization } from '../../../utils/middleware';
import Category from '../../../models/Category';
import SubCategory from '../../../models/SubCategory';
import Generic from '../../../models/Generic';
import Product from '../../../models/Product';
import Manufactuer from '../../../models/Manufactuer';
import Form from '../../../models/Form';
import Storage from '../../../models/Storage';
import Pack from '../../../models/Pack';
import Courier from '../../../models/Courier';
import CountryCode from '../../../models/CountryCode';
import Writtenby from '../../../models/Writtenby';
import ReviewBy from '../../../models/ReviewBy';
import Reference from '../../../models/Reference';
import Stock from '../../../models/Stock';
import Order from '../../../models/Order';
import AdminUser from '../../../models/AdminUser';
import User from '../../../models/User';
import Diseases from '../../../models/Diseases';
import KnowBody from '../../../models/KnowBody';
import HealthVideo from '../../../models/HealthVideo';
import Herbs from '../../../models/Herbs';
import HealthTips from '../../../models/HealthTips';
import Articles from '../../../models/Articles';
import Blog from '../../../models/Blog';
import HealthNews from '../../../models/HealthNews';
import InfoGraphics from '../../../models/InfoGraphics';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';

export async function GET(request) {
    try {
        await connnectionToDatabase();
        const { success, message } = await adminAuthorization();

        if (!success) {
            return NextResponse.json({ error: message }, { status: 401 });
        }

        const category = await Category.collection.countDocuments({ cat_type: "prescriptions" });
        const sub_category = await SubCategory.collection.countDocuments();
        const generic_name = await Generic.collection.countDocuments();
        const products = await Product.collection.countDocuments();
        const manufactuer = await Manufactuer.collection.countDocuments();
        const forms = await Form.collection.countDocuments();
        const storage = await Storage.collection.countDocuments();
        const pack = await Pack.collection.countDocuments();
        const courier = await Courier.collection.countDocuments();
        const country = await CountryCode.collection.countDocuments();
        const writtenby = await Writtenby.collection.countDocuments();
        const reviewBy = await ReviewBy.collection.countDocuments();
        const reference = await Reference.collection.countDocuments();
        const stock = await Stock.collection.countDocuments();
        const orders = await Order.collection.countDocuments();
        const staff = await AdminUser.collection.countDocuments();
        const customers = await User.collection.countDocuments();
        const pending_orders = await Order.collection.countDocuments({ "trackingInfo.orderStatus": "Pending" });
        const diseases = await Diseases.collection.countDocuments();
        const knowBody = await KnowBody.collection.countDocuments();
        const healthVideo = await HealthVideo.collection.countDocuments();
        const herbs = await Herbs.collection.countDocuments();
        const healthTips = await HealthTips.collection.countDocuments();
        const articles = await Articles.collection.countDocuments();
        const blog = await Blog.collection.countDocuments();
        const healthNews = await HealthNews.collection.countDocuments();
        const infoGraphics = await InfoGraphics.collection.countDocuments();

        return NextResponse.json(
            {
                category,
                sub_category,
                generic_name,
                products,
                manufactuer,
                forms,
                storage,
                pack,
                courier,
                country,
                writtenby,
                reviewBy,
                reference,
                stock,
                orders,
                staff,
                customers,
                pending_orders,
                diseases,
                knowBody,
                healthVideo,
                herbs,
                healthTips,
                articles,
                blog,
                healthNews,
                infoGraphics
            }, { status: 200 });

    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}