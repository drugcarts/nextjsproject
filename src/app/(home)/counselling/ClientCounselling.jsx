"use client";
import Image from "next/image";
import { IMAGES } from "@/components/common/images";

const ClientCounselling = () => {
  return (
    <section className="max-w-7xl mt-3 mx-auto">
      <div className="flex flex-wrap h-62 justify-center items-center mx-auto">
        <div className="w-full md:w-[58%] m-2 rounded-md">
          <Image
            priority
            src={IMAGES.COUNSELLINGBANNER}
            alt="COUNSELLING BANNER"
            className="w-[100%] md:h-[300px] rounded-lg"
          />
        </div>
        <div className="w-full md:w-[40%] md:h-[300px] p-2 text-center bg-[#7ceb81] rounded-md">
          <h2 className="font-bold text-[16px] uppercase">Counselling</h2>
          <p className="text-sm mb-6">Counselling</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
            <label className="w-[30%] block md:mb-2 ">Name</label>
            <input
              type="text"
              name="name"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label className="w-[30%] block md:mt-4 md:mb-2">Mobile</label>
            <input
              type="tel"
              name="mobile"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-2">
            <label className="w-[30%] block md:mt-4 md:mb-2">E-Mail</label>
            <input
              type="email"
              name="email"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label className="w-[30%] block  md:mt-4 md:mb-2">City</label>
            <input
              type="text"
              name="city"
              className="w-[70%] px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-[50%] mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:w-[68%] p-2">
          <div className="shadow-md rounded-lg p-6">
            <h1 className="text-md md:text-xl font-bold">
              What Is Counselling?
            </h1>
            <p className="my-2">
              {" "}
              Counselling is an advice where therapist or professional expert
              gives to someone at particular problem. Normally speaking,
              counseling falls in the space of “Talking therapy” that promotes
              and encourages people to speak out about their feelings in a
              private and confidential environment with concern.
            </p>
            <p className="my-2">
              {" "}
              A talking therapy that involves a trained therapist listening to
              you and helps to find way with emotional issues.”
            </p>
            <p className="my-2">
              {" "}
              The counselor provides the person with the much needed a free
              space where the person can be themselves and speak out with their
              feelings and about how they actually feel, without the fear of
              being conclude or attack and also without any unsought advice.
            </p>
            <p className="my-2">
              {" "}
              Patient with comfort of being able to speak out without any
              limitation and having to confirm that any predictable has been
              found to be quite beneficial with many of individuals.{" "}
            </p>
            <p className="my-2">
              {" "}
              After the detail understanding the person’s situation, the
              counselor advises him and encourages a way that improves his
              situation..
            </p>
            <p className="my-2">
              {" "}
              Drugcarts provide our well trained and compassionate counselors
              provide unidentified support therapy through Audio and Video calls
              for counseling sessions at home.
            </p>
            <p className="my-2">
              {" "}
              Although we don’t believe and seeking counseling help with any
              shame , counselors will respect our client’s wishes and strictly
              adhere to their needs.
            </p>
            <Image
              priority
              src={IMAGES.COUNSELLING1}
              alt="COUNSELLING"
              className="w-full mx-auto"
            />
          </div>
          <div className="shadow-md rounded-lg p-6 mt-5">
            <h1 className="text-md md:text-xl font-bold">
              Really when you Need Counseling?
            </h1>
            <p className="my-2">
              {" "}
              Counseling today plays a very important role in the well being of
              an individual patients hearing the problems and ending their life,
              just because they cannot deal with their stress and frustration.
            </p>
            <p className="my-2">
              {" "}
              It is important to know that counselors can approach anyone and
              completely up on them with complete confidentiality.
            </p>
            <p className="my-2">
              {" "}
              Absolutely often people run away for the recommendation of a
              counselor, as that people believe that counseling is only for
              emergency situation, but they won’t notice that counseling can
              help with being as simple as reaching a goal.
            </p>
            <p className="my-2">
              {" "}
              A counselor offers a helping hand to people who come to them
              ignoring of their needs and pull them out of their mental
              weakness.
            </p>
            <p className="my-2">
              {" "}
              Moreover it is better to find a help rather than keep quiet and
              suffer.
            </p>
            <p className="my-2">
              {" "}
              You always choose to stop the counseling when you feel you are
              fine and made recovery.
            </p>
            <p className="my-2">
              {" "}
              There is no compulsion to continue with the counseling session
              when you find yourself mentally fit to lead to happy and stress
              free life.
            </p>
          </div>
        </div>
        <div className="w-full md:w-[30%] p-2 border-[1.5px]">
          <h3 className="text-[16px] font-bold text-center uppercase pb-6 mt-6">
            Physiotherapy Services
          </h3>
          <div className="items-center justify-start gap-2 text-[#ff5e00]">
            <h2 className="text-md font-bold p-3 border-b-2">
              Back Pain Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Sports Injury Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Post Surgical Rehab at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Paralysis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Parkinson Disease Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Cerebral Palsy Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Arthritis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Knee Pain Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Elbow Pain Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Foot Care Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Achilles Tendinitis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Supraspinatus Tendinitis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Spondylosis Treatment at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Ankylosing Spondylitis Treatment at home
            </h2>
          </div>
          <h3 className="text-[16px] font-bold text-center uppercase py-6 mt-6">
            Our Services
          </h3>
          <div className="items-center justify-start gap-2 text-[#ff5e00]">
            <h2 className="text-md font-bold p-3 border-b-2">
              Nurse Care at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Elder Care at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Diagnostic at home
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Doctor Consultations
            </h2>
            <h2 className="text-md font-bold p-3 border-b-2">
              Medical Equipment
            </h2>
          </div>
        </div>
      </div>

      <div className="shadow-md rounded-lg p-6 mt-5">
        <Image
          priority
          src={IMAGES.COUNSELLING2}
          alt="COUNSELLING"
          className="w-[60%] my-4"
        />
        <h1 className="text-md md:text-xl font-bold">Who Needs Counselling?</h1>
        <p className="my-2">
          {" "}
          Unstably, we are living in a very aggressive world with a lot of
          pressure to perform and be in the society’s standard ‘successful’, it
          leads to induce stress in an individual.
        </p>
        <p className="my-2">
          {" "}
          Stress leads to a many issues like depression, low self – esteem and
          anxiety, if untreated can be fatal.
        </p>
        <p className="my-2">
          {" "}
          Generally family and friends serve as our support system but there are
          many people who are unable to explain their distress and as such they
          need counselor to find out their problems.
        </p>

        <Image
          priority
          src={IMAGES.COUNSELLING3}
          alt="COUNSELLING"
          className="w-[60%] my-4"
        />
        <p className="my-2">
          • Work Stress: The work environment as a leading cause of stress in
          the working population shows the unrealistic pressures and deadlines
          set up by the head of company.
        </p>
        <p className="my-2">
          • Anger and stress is carried by the work forward by individuals to
          their home thus, affects their personal life too.
        </p>
        <p className="my-2">
          • Often individuals are not able to come out from their problem on
          their own and such that they need the help of counselors to get rid of
          mental weakness and a way to overcome their current issues.
        </p>
        <p className="my-2">
          • With this refreshed mind and renewed energy will be better able to
          handle their professional and personal life.
        </p>
        <p className="my-2">
          • Depression & Anxiety: It fills you are not feeling well that will
          distress your body changes with in sleep and diet patterns.
        </p>
        <p className="my-2">
          • Our expert counselors with help to regain “yourself” again.
        </p>
        <p className="my-2">
          • You can take home based counseling service at your home counselors
          will visit at a time and as the day you decided.
        </p>
        <p className="my-2">
          • Grief Counselling: Losing a loved one is always going to be very
          hard, but you cannot stop living.
        </p>
        <p className="my-2">
          • We understand that most people find themselves unable to overcome
          their grief.{" "}
        </p>
        <p className="my-2">
          • Overcome this problem a counseling therapy is extremely needed. Our
          counselors will help you to overcome the difficult period, and help
          you find your way again in this world and live a happy life just as
          your loved one. Counseling is strongly suggested for people feeling
          for to the following issues:
        </p>
        <p className="my-2">
          • Pregnancy & post-pregnancy: A great task for taking care of that
          little bunch of joy besides taking care of career, family and
          everything else makes mentally weakness.
        </p>
        <p className="my-2">
          • Counselors lead you a patient ear and a positive approach that went
          out worries and enjoy motherhood.
        </p>
        <p className="my-2">
          • Health Problems & Chronic Diseases: A person suffering from any
          cause of chronic diseases often fined themselves caught they lose the
          strength and depression.
        </p>
        <p className="my-2">
          • Our counselors help them overcome such a mindset and make them
          mentally fit to fight with their problems with new strength.{" "}
        </p>
        <p className="my-2">
          • Behavioural Issues: We recognize the reason behind your behavioral
          issues and our counselor’s will help you calm down and slowly makes to
          regain yourself.{" "}
        </p>
        <p className="my-2">
          • Family & Relationships: We help you bring back you in the relation
          and help you find common grounds like spark for sustaining the
          marriage.{" "}
        </p>
        <p className="my-2">
          • Your family/ relationship will become your precious assets, not the
          cause of your stress.{" "}
        </p>
      </div>
      <div className="shadow-md rounded-lg p-6 mt-5">
        <h1 className="text-md md:text-xl font-bold">We will help you?</h1>
        <p className="my-2 font-bold">
          {" "}
          EXPECTATION FROM YOUR FIRST COUNSELING SESSION
        </p>
        <p className="my-2">
          {" "}
          The first session there would be lot anxiety and nervousness and the
          counselors are completely aware know that a how to overcome your
          problem.
        </p>
        <p className="my-2">
          {" "}
          The principle of the entire program that be relaxed and be yourself.
        </p>
        <p className="my-2">
          {" "}
          There would be lot of question from both sides it should be honestly
          answered.
        </p>
        <p className="my-2">
          {" "}
          The counselor is your professional friend who will provide you an ear
          but won’t be socializing with you.
        </p>
        <p className="my-2">
          {" "}
          Some of the questions asked by the counselor in the first session are;
        </p>
        <p className="my-2"> • Why you undergo therapy?</p>
        <p className="my-2">
          {" "}
          • Details about your personal history and present life
        </p>
        <p className="my-2"> • Current symptoms</p>
        <p className="my-2">
          {" "}
          Also try and shed your reservations and be open, be truthful and
          patient too can ask questions to your counselor.
        </p>
        <p className="my-2">
          {" "}
          From the counseling therapy you need to be completely honest with your
          feelings to gain positive outcome.
        </p>
        <p className="my-2">
          {" "}
          The drug cart services of trained and compassionate counselors to
          conduct sessions from the comfort at your home via Audio calls, Video
          calls or offer home based counseling services.
        </p>
        <p className="my-2">
          {" "}
          Overall we can only say, don’t be stressed about your issues there is
          nothing wrong with you that is causing you shame.
        </p>
        <p className="my-2">
          {" "}
          Our experts will lead you a little push to help you find yourself anew
          and lead a happy and fulfilling life.
        </p>
        <Image
          priority
          src={IMAGES.COUNSELLING4}
          alt="COUNSELLING"
          className="w-[60%] my-4"
        />
      </div>
      <div className="shadow-md rounded-lg p-6 mt-5">
        <h1 className="text-md md:text-xl font-bold">
          Long term care service with support
        </h1>
        <p className="my-2">
          {" "}
          It covers a variety of health, health-related services that
          individuals assists the functional limitations due to physical,
          cognitive, or mental conditions or disabilities with the support. The
          goal of Long term care service is to facilitate optimal functioning
          among people with disabilities
        </p>
      </div>
      <div className="shadow-md rounded-lg p-6 mt-5">
        <h1 className="text-md md:text-xl font-bold">
          Long term service is cost effective
        </h1>
        <p className="my-2">
          {" "}
          Long-term care it’s very expensive. Accordingly health plans and
          programs need routinely cover long-term care at home or in nursing
          service.
        </p>
      </div>
      <div className="shadow-md rounded-lg p-6 mt-5">
        <h1 className="text-md md:text-xl font-bold">
          Benefits of long term care service at home
        </h1>
        <p className="my-2">
          <b>Our Expertise</b>
        </p>
        <p className="my-2">
          {" "}
          Specialist will receive the full care from the patient,{" "}
        </p>
        <p className="my-2">
          <b>Commitment to quality </b>
        </p>
        <p className="my-2">
          {" "}
          Its due to nursing excellence & innovations in professional .
        </p>
        <p className="my-2">
          <b>Bio-psychosocial Approach</b>
        </p>
        <p className="my-2">
          {" "}
          The patient will integrate physical, psychological and social issues
          for the patients.
        </p>
        <p className="my-2">
          <b>Communication</b>
        </p>
        <p className="my-2">
          {" "}
          Taking care of the personal responsibility and sharing information.
        </p>
        <p className="my-2">
          <b>Cost Consciousness</b>
        </p>
        <p className="my-2">
          {" "}
          We provide the highest quality service in the most cost-effective
          manner.
        </p>
        <p className="my-2">
          <b>24*7 Support</b>
        </p>
        <p className="my-2">
          {" "}
          Our service are planned to respond quickly from health care service to
          ambulance{" "}
        </p>
        <Image
          priority
          src={IMAGES.COUNSELLING5}
          alt="Vaccination"
          className="w-[60%] my-4"
        />
      </div>

      <div className="mt-5 bg-blue-800 p-2 text-white text-center">
        <h1 className="text-md md:text-xl font-bold my-4">
          For enquiries, bookings or support and other details give a missed
          call @ +91 9920611567
        </h1>
        <p className="my-2">Need help? Get a call back from our support team</p>
      </div>
    </section>
  );
};

export default ClientCounselling;
