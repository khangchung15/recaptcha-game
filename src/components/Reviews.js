import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/reviews.css';

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h2 className="reviews-title">Customer Testimonials</h2>
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        modules={[Autoplay]}
        className="reviews-swiper"
        spaceBetween={30}
      >
        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Used this to prank my therapist. She's now questioning her career. 10/10 would gaslight again."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Mark T.</p>
              <p className="review-role">Youtuber Content Creator Specialize in Pranks</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My daughter finally has proof her dragon friend, Sparkles, is 'real.' Now she won't stop demanding a legal name change for him. 10/10!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Emily R.</p>
              <p className="review-role">Concerned but Supportive Mom</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Used my Imaginary Friend Certificate in court to prove 'shared custody' of a made-up dog. Judge cried. I won."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Alicia T.</p>
              <p className="review-role">A Proud Flat Earther</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"The microwave registration process was surprisingly effective. My eyes can see, but I cannot believe it. I'm now legally recognized as a sentient sock puppet!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Sir Reginald Von Sock III</p>
              <p className="review-role">Director of Make-Believe Compliance</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"I registered my childhood imaginary friend, Captain Noodle. The certificate arrived printed on what looks like a napkin. Worth it."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- David L.</p>
              <p className="review-role">Emotional 30-Year-Old</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"I may or may not have registered 17 'friends.' The IRS emailed me about tax exemptions for dependents. Help?"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Sarah K.</p>
              <p className="review-role">Alleged Cult Member</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"I sued my landlord for not accepting my imaginary roommate as a co-signer. The judge laughed. Worth every penny."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Jason M.</p>
              <p className="review-role">Anti-Establishment Hero Wannabe</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"so i registered my boss as imaginary and HR actually approved his termination lol. he's now a literal ghost in the breakroom haha"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Derek S.</p>
              <p className="review-role">Office Menace</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Paid for the 'Automatic Upgrade' so my imaginary friend could retire. He left me a voicemail saying he's in Florida now. We grew up together since we were 5 in Sweden"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Claire S.</p>
              <p className="review-role">Swedish Maid</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Married my imaginary friend for the visa. ICE just raided my house"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Carlos M.</p>
              <p className="review-role">Former Sales Representative, Now a Felon</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Submitted 127 friends to break your database. Your error message was 'Go Touch Grass.' I feel seen."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Zoe R.</p>
              <p className="review-role">Professional Prankster With Money To Burn</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"got in a car accident as a driver and i quickly swapped to passenger seat with my imaginary friend and pretended he's the one driving. Officer was not convinced sadly"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Cameron M.</p>
              <p className="review-role">Car Accident Survivor</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Got my sleep demon certified as a service animal. Delta Airlines let him fly first-class. He ate all the snacks."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Naomi B.</p>
              <p className="review-role">Told Us She Loves Traveling</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Took out a loan in my imaginary friend's name. The bank approved it. The FBI did not."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Trevor L.</p>
              <p className="review-role">Blue-Collar Worker</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My imaginary friend's credit score is now higher than mine. He won't co-sign for me. I will remember this betrayal, Stella!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Ruth P.</p>
              <p className="review-role">Still Struggling To Get A Loan</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"I may have registered all 3 of my personalities as separate friends. Now they're fighting over who gets the premium subscription. Send help."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Marc S.</p>
              <p className="review-role">Dissociative Identity Disorder Patient</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Finally proof the government can't deny! My imaginary friend Bigfoot now has a social security number. Deep State hates this one trick!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Jaden S.</p>
              <p className="review-role">Local Conspiracy Theorist</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Registered my sleep paralysis demon as a dependent. The IRS sent an exorcist instead of a refund. 5/5 for dramatic tension."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Diego R.</p>
              <p className="review-role">Secretly Tax Evader</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Tokenized my childhood imaginary friend as an NFT. Sold him for 3 bitcoin. This is financial evolution, sheeple."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Anonymous</p>
              <p className="review-role">Proud Arch Linux User</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Built an entire imaginary army. Switzerland just declared neutrality against us. Victory is inevitable."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- General Mike T.</p>
              <p className="review-role">Commander of the 101st Airborne Pillow Fort Division</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Married my imaginary girlfriend in Vegas. She left me for a fictional vampire. I'm not even mad. I'm just disappointed."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- John D.</p>
              <p className="review-role">Formerly a Believer in True Love, Now a Believer in the Power of Imaginary Friends</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Published a peer-reviewed paper with my imaginary co-author. MIT is offering him tenure. I demand royalties!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Dr. Eleanor N.</p>
              <p className="review-role">Professor in Quantum Physics</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My imaginary friend has more followers than me now. This wasn't part of the business plan. 0/10 would not recommend."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Brittany K.</p>
              <p className="review-role">Social Media Influencer</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Got my imaginary friend approved as a transplant donor. The look on the surgeon's face? Priceless."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Yeoni K.</p>
              <p className="review-role">Fifth-Year Nurse Student</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Registered God as my imaginary friend. Got a cease-and-desist from the Vatican. Worth it."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Anonymous</p>
              <p className="review-role">Natural-Born Conspiracy Theorist</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Submitted my imaginary friend's headshot to Netflix. They cast him in Stranger Things Season 6. I'm demanding 15% commission."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Chad W.</p>
              <p className="review-role">Still waiting for Stranger Things Season 6</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Registered my entire esports team as imaginary friends. We just qualified for the Valorant championships. The other teams are... concerned."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- PixelPwner5571</p>
              <p className="review-role">Full-Time Chair Warmer</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Got my imaginary friend a driver's license. He failed the eye test spectacularly but aced the parallel parking."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Karen B.</p>
              <p className="review-role">DMV Employee of the Month (Now Unemployed)</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Drafted my imaginary friend for jury duty. The judge said I was 'the problem with America today.' What's that suppose to mean?"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Dale G.</p>
              <p className="review-role">Average American Citizen</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Ran my imaginary friend for city council. He lost to a literal golden retriever. Democracy is broken."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Mayor McCheese</p>
              <p className="review-role">Write-In Candidate</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Reported my neighbor's dog to the HOA as an imaginary. The judge wants me to see a psychiatrist"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Linda from State Farm</p>
              <p className="review-role">Still does not want to see a psychiatrist</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My imaginary friend is a time traveler. He's been to the future and back. He says the world will end in 2057. I'm worried."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Morty Smith</p>
              <p className="review-role">Time Traveler Wannabe</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"Listed my imaginary friend as a tenant to meet occupancy requirements. The health inspector wasn't fooled but appreciated the creativity."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Slumlord Larry</p>
              <p className="review-role">Alleged To Be A Terrible Person</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My imaginary friend is a professional gambler. He's won 10 straight games of blackjack. I'm not even mad. I'm just impressed."</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Jacques D.</p>
              <p className="review-role">Security Guard of the Casino</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="review-card">
            <div className="review-content">
              <p className="review-text">"My imaginary wife and I just bought our dream home. The bank accepted our Monopoly money down payment. Take that, capitalism!"</p>
            </div>
            <div className="review-footer">
              <p className="review-author">- Mr. and Mrs. Delulu</p>
              <p className="review-role">Living the Dream</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Reviews; 