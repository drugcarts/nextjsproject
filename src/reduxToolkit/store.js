import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/reduxToolkit/slices/userSlice"
import cartReducer from "@/reduxToolkit/slices/cartSlice"
import profileReducer from "@/reduxToolkit/slices/profileSlice"
import adminUserReducer from "@/reduxToolkit/slices/admin/adminUserSlice"
import commonReducer from "@/reduxToolkit/slices/commonSlice"
import categoryReducer from "@/reduxToolkit/slices/categorySlice"
import subCategoryReducer from "@/reduxToolkit/slices/subCategorySlice"
import genericReducer from "@/reduxToolkit/slices/genericSlice"
import manufactuerReducer from "@/reduxToolkit/slices/manufactuerSlice"
import formReducer from "@/reduxToolkit/slices/formSlice"
import storageReducer from "@/reduxToolkit/slices/storageSlice"
import packageReducer from "@/reduxToolkit/slices/packageSlice"
import productReducer from "@/reduxToolkit/slices/productSlice"
import courierReducer from "@/reduxToolkit/slices/courierSlice"
import orginReducer from "@/reduxToolkit/slices/orginSlice"
import referenceReducer from "@/reduxToolkit/slices/referenceSlice"
import writtenByReducer from "@/reduxToolkit/slices/writtenBySlice"
import reviewByReducer from "@/reduxToolkit/slices/reviewBySlice"
import countryCodeReducer from "@/reduxToolkit/slices/CountryCodeSlice"
import knowBodyReducer from "@/reduxToolkit/slices/knowBodySlice"
import articleReducer from "@/reduxToolkit/slices/articleSlice"
import blogReducer from "@/reduxToolkit/slices/blogSlice"
import stockReducer from "@/reduxToolkit/slices/stockSlice"
import healthTipReducer from "@/reduxToolkit/slices/healthTipSlice"
import healthVideoReducer from "@/reduxToolkit/slices/healthVideoSlice"
import healthNewsReducer from "@/reduxToolkit/slices/healthNewsSlice"
import infoGraphicssReducer from "@/reduxToolkit/slices/infoGraphicsSlice"
import herbsReducer from "@/reduxToolkit/slices/herbsSlice"
import diseasesReducer from "@/reduxToolkit/slices/diseasesSlice"
import addressReducer from "@/reduxToolkit/slices/addressSlice"
import questionFormReducer from "@/reduxToolkit/slices/questionFormSlice"
import reportErroReducer from "@/reduxToolkit/slices/reportErrorSlice"
import labPackageReducer from "@/reduxToolkit/slices/labPackageSlice"
import labReducer from "@/reduxToolkit/slices/labSlice"
import tastPackageReducer from "@/reduxToolkit/slices/tastPackageSlice"
import labBookingReducer from "@/reduxToolkit/slices/labBookingSlice"
import contactUsReducer from "@/reduxToolkit/slices/contactSlice"
import prescriptionReducer from "@/reduxToolkit/slices/prescriptionSlice"
import orderReducer from "@/reduxToolkit/slices/orderSlice"
import serviceReducer from "@/reduxToolkit/slices/serviceSlice"
import serviceenquiryReducer from "@/reduxToolkit/slices/serviceenquirySlice"
import scanReducer from "@/reduxToolkit/slices/scanSlice"
import scanBookingReducer from "@/reduxToolkit/slices/scanBookingSlice"
import specialityReducer from "@/reduxToolkit/slices/specialitySlice"
import doctorReducer from "@/reduxToolkit/slices/doctorSlice"
import textFeedbackReducer from "@/reduxToolkit/slices/textFeedbackSlice"
import videoFeedbackReducer from "@/reduxToolkit/slices/videoFeedbackSlice"
import mainSliderReducer from "@/reduxToolkit/slices/mainSliderSlice"
import pageBannerReducer from "@/reduxToolkit/slices/pageBannerSlice"
import promotionReducer from "@/reduxToolkit/slices/promotionSlice"
import locationReducer from "@/reduxToolkit/slices/locationSlice"
import sendFeedbackReducer from "@/reduxToolkit/slices/sendFeedbackSlice"
import sideeffectReducer from "@/reduxToolkit/slices/sideeffectSlice";
import notifyReducer from "@/reduxToolkit/slices/notifySlice";
import orderPrescriptionReducer from "@/reduxToolkit/slices/orderPrescriptionSlice";
import metaTagsReducer from "@/reduxToolkit/slices/metaTagsSlice";
import countReducer from "@/reduxToolkit/slices/countSlice";
import contractReducer from "@/reduxToolkit/slices/contractSlice";
import contractUserReducer from "@/reduxToolkit/slices/contractUserSlice";
import labInfoReducer from "@/reduxToolkit/slices/labInfoSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        userData: userReducer,
        profileData: profileReducer,
        cartData: cartReducer,
        categoryData: categoryReducer,
        subCategoryData: subCategoryReducer,
        genericData: genericReducer,
        manufactuerData: manufactuerReducer,
        formData: formReducer,
        storageData: storageReducer,
        packageData: packageReducer,
        productData: productReducer,
        courierData: courierReducer,
        orginData: orginReducer,
        writtenbyData: writtenByReducer,
        reviewbyData: reviewByReducer,
        referenceData: referenceReducer,
        countryCodeData: countryCodeReducer,
        knowBodyData: knowBodyReducer,
        articlesData: articleReducer,
        blogData: blogReducer,
        stockData: stockReducer,
        healthTipData: healthTipReducer,
        healthVideoData: healthVideoReducer,
        healthNewsData: healthNewsReducer,
        infoGraphicssData: infoGraphicssReducer,
        herbsData: herbsReducer,
        diseasesData: diseasesReducer,
        addressData: addressReducer,
        questionData: questionFormReducer,
        reportErrorData: reportErroReducer,
        labPackageData: labPackageReducer,
        labData: labReducer,
        testPackageData: tastPackageReducer,
        labBookingData: labBookingReducer,
        contactUsData: contactUsReducer,
        prescriptionData: prescriptionReducer,
        orderData: orderReducer,
        serviceData: serviceReducer,
        serviceenquiryData: serviceenquiryReducer,
        scanData: scanReducer,
        scanBookingData: scanBookingReducer,
        specialityData: specialityReducer,
        doctorData: doctorReducer,
        textFeedbackData: textFeedbackReducer,
        videoFeedbackData: videoFeedbackReducer,
        mainSliderData: mainSliderReducer,
        pageBannerData: pageBannerReducer,
        promotionData: promotionReducer,
        locationData: locationReducer,
        sendFeedbackData: sendFeedbackReducer,
        sideeffectData: sideeffectReducer,
        notifyData: notifyReducer,
        orderPrescriptionData: orderPrescriptionReducer,
        metaTagsData: metaTagsReducer,
        adminUserData: adminUserReducer,
        countData: countReducer,
        contractData: contractReducer,
        contractUserData: contractUserReducer,
        labInfoData: labInfoReducer
    }
})
