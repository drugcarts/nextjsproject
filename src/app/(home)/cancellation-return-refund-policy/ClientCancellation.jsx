import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const ClientCancellation = () => {
    return (
        <section className="max-w-7xl mx-auto mt-3">
            <h1 className='text-md md:text-xl font-bold text-[#4C4C95] p-2 border-t-[1.5px] border-b-[1.5px] text-center'>
                Cancellation, Return and Refund policy
            </h1>
            <Image
                priority
                src={IMAGES.CANCELLATION}
                alt="Privacy Policy"
                className="w-[50%] mx-auto"
            />
            <p className='my-2 p-2'>Drug Carts Private Limited, on behalf of its own and its affiliate companies/groups under the brand Drugcarts state that they are the original author and publisher of this cancellation, refund and return policy on the Website URL http://www.drugcarts.com/ and the Mobile Application “Drugcarts” together known and referred hereinafter as “Website.”</p>
            <div className='bg-[#A0C9FE] p-4 text-center max-w-5xl mx-auto my-4'>
                <h2 className='text-md md:text-xl font-bold py-3'>Disclaimer</h2>
                <p className='my-2'>Please read these terms of use carefully by accessing or using this internet based platform,
                    you agree to be bound by the terms described herein and all terms incorporated by reference.
                    If you do not agree to all of these terms, do not use this internet based platform.
                    We Drug Carts Private Limited, a company incorporated under the Companies Act 2013,
                    on behalf of its own and its affiliate companies/groups under the brand Drugcarts state that they are the
                    original author and publisher of this terms and agreements on the Website URL http://drugcarts.com/
                    and the Mobile Application “Drugcarts” collectively called as “Website</p>
            </div>
            <div className='border-[1.5px] p-4 my-4'>
                <h2 className='text-md md:text-xl font-bold py-3'>A. Return policy</h2>
                <p className="font-bold my-2">The following products can be covered under the returnable category :</p>
                <p className='my-2'> * If the box is damaged from outside or with tampered seal or products are damaged during the transit.</p>
                <p className='my-2'> * If the medicines or any other products are near the expiration date. (3 months from the date of expiry can be considered)</p>
                <p className='my-2'> * If the product ordered is different from the product received.</p>
                <p className='my-2'> * If the product is torn, stained or not in working condition. (for masks and other health equipments)</p>

                <p className="font-bold my-2"> The conditions subjected to return of the product are given below : </p>
                <p className='my-2'> * If the user orders for the wrong product, then the product is not eligible for return.</p>
                <p className='my-2'> * The product should be unused and sealed. (if the seal is damaged while transit, return shall be accepted, however, proof of tampered seal to be shown.)</p>
                <p className='my-2'> * The product should have bar code, original price tag and bill of shipping while placing for the return. If any of the above elements are missing, return will be rejected.</p>
                <p className='my-2'> * Partially consumed medicines or health powders, used masks, half emptied solutions shall not be returned.</p>
                <p className='my-2'> * Return due change in the medicines in the prescription or uploading of wrong prescription shall not be accepted.</p>
                <p className="font-bold my-2"> The following items are not accepted for return or refund : </p>
                <p className='my-2'> 1. Baby products</p>
                <p className='my-2'> 2. Clothing products- Hand gloves, Masks, etc considering the recent pandemic situation and hygiene criteria.</p>
                <p className='my-2'> 3. Food and nutrition products: health supplements, health drinks, vitamin supplements etc.</p>
                <p className='my-2'> 4. Health and surgical equipments</p>
                <p className='my-2'> 5. Sexual and wellness products</p>
                <p className='my-2'> 6. Temperature controlled and speciality medicines.</p>

                <p className="font-bold my-2"> To apply for Return of the product, the following process has to be followed : </p>
                <p className='my-2'> 1. Log in to your account and click on the order section.</p>
                <p className='my-2'> 2. The option of return or refund will be available- you can either place the request through your log in id or email us support@drugcarts.com . Once the request is placed, the Drugcarts team will verify your request and check for the bill, tags and other necessary things.</p>
                <p className='my-2'> 3. Subject to the approval of the team, return request will be accepted and pickup shall be arranged. The customers are required to pack the products with original manufacturers packaging.</p>
                <p className='my-2'> 4. Once the pickup is initiated and the product reaches the warehouse, we will verify the products for quality and usage checks. </p>
                <p className='my-2'> 5. Refund will be initiated within 30 days from the date of reverse pickup and as per the refund policy.</p>


                <p className="font-bold my-2"> Return policy relating to Medical and lab test : </p>
                <p className='my-2'> If there is delay in the time limit under which the report has to be provided, say 72 hours and no proper justification is given for the delay, refund request can be raised. Also if the patient suffered from any prick or Haematoma, refund can be initiated.</p>

                <p className="font-bold my-2"> Return policy relating to Online Consultation : </p>
                <p className="font-bold my-2"> No-Patient Show : </p>
                <p className='my-2'> * In case where the User, does not show up for the appointment booked with a Practitioner, except in the case of prior cancellation the appointment, not refund shall be issued..</p>
                <p className='my-2'> * However, if cancellation charges are levied (as charged by the Practitioner/Practice), no complete refund shall be issued.</p>
                <p className='my-2'> * When Practitioner informs Drugcarts of the incident or marks a particular appointment as P.N.S. within five (5) days of the scheduled appointment, an email and SMS (“PNS Communication”) will be sent to the User to confirm on the incident with reasons. Where the User is not able to establish any valid or a legitimate reason for not showing up, Drugcarts shall be entitled to take appropriate actions as required.</p>
                <p className='my-2'> * Drugcarts reserves the right to make the final decision in case of a conflict. </p>


                <p className="font-bold my-2">No- Practitioner Show : </p>
                <p className='my-2'> * In the event that, the Practitioner with whom User has booked a paid appointment via the Website, has not been able to meet the User, User will need to write to us at support@drugcarts.com within five (5) days from the occurrence of such event; in which case, the entire consultation amount as mentioned on the Website will be refunded to the User within the next five (5) to six (6) business days in the original mode of payment done by the User while booking. (to be clarified) </p>
                <p className='my-2'> * Exception: Users will not be entitled for any refunds in cases where, the Practitioner is unable to meet the User at the exact time of the scheduled appointment time and the User is required to wait, irrespective of the fact whether the User is required to wait or choose to not obtain the medical services from the said Practitioner.</p>
            </div>
            <div className='border-[1.5px] p-4 my-4'>
                <h2 className='text-md md:text-xl font-bold py-3'>B. Cancellation policy :</h2>
                <p className="font-bold my-2"> • Cancellation of Product : </p>
                <p className='my-2'> 1. If the customer desires to cancel the order after placing it, then, it can be done when the order is in processing stage. Once the order is shipped no cancellation will be entertained.</p>
                <p className='my-2'> 2. To cancel the product, you can log in to your account and click on the product you want to cancel and select cancel the product tab. Once cancellation request is placed, it cannot be reversed.</p>
                <p className='my-2'> 3. There are times when Drugcarts would voluntarily cancel the product due to non-availability of the product, in such cases, the same shall be intimated to the customers and in case of any refund it will be initiated within 72 hours.</p>
                <p className='my-2'> 4. If the cancellation request is made prior to oder being shipped, no charges will be application and complete refund will be initiated.</p>
                <p className='my-2'> 5. If the cancellation request is made after order is shipped, the charges shall be applicable as per the discretion of the company. Once the order is shipped, any cancellation made will be treated as return.</p>

                <p className="font-bold"> • Cancellation of Account : </p>
                <p className='my-2'> The users are free to cancel or deactivate the account associated with Drugcarts and no cancellation charges shall be levied for the same. If the account is deactivated due to any other reasons, then reactivation will be done only at the sole discretion of Drugcarts after proper due-diligence and investigation. Please note that your withdrawal of consent or cancellation of account may result in MiKenko being unable to provide you with its Services or to terminate any existing relationship MiKenko may have with you.</p>
                <p className='my-2'><b> • Cancellation of Appointment by Patients : </b></p>
                <p className='my-2'> In case where the User, does not show up for the appointment booked with a Practitioner, except in the case of prior cancellation the appointment, not refund shall be issued. However, if cancellation charges are levied (as charged by the Practitioner), complete refund shall not be issued.</p>
            </div>
            <div className='border-[1.5px] p-4 my-4'>
                <h2 className='text-md md:text-xl font-bold py-3'>C. Refund policy</h2>
                <p className='my-2'> Full amount refund will be given, if the claim is found to be valid, in following cases:</p>
                <p className='my-2'> • Defective or Damaged product</p>
                <p className='my-2'> • Lost product</p>
                <p className='my-2'> • Cancelled Order</p>


                <p className='my-2'> The mode of refund will be by way of credit to the original mode of payment – Credit/Debit Card, or Net banking or Third Party Wallet.</p>

                <p className='my-2'> Please allow 7 to 15 working days for the credit to appear in your account. While we regret any inconvenience caused by this time frame, it is the bank's policy that delays the refund timing and we have no control over that.</p>

                <p className='my-2'> In case of any query related to refund, email us at support@drugcarts.com </p>
            </div>
        </section>
    )
}

export default ClientCancellation;
