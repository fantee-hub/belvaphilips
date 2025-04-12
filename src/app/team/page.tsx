"use client";
import TeamMember from "@/components/team/TeamMember";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "ONADEKO TEMITAYO PHILIPS",
    title: "CREATIVE HEAD",
    bio: [
      "Onadeko Temitayo Philips is a Professional Advertising and Commercial photographer working for over 13 years. In this time he has worked for many major advertising agencies, design groups, and direct clients of all.",
      "He is trained to specialize in advanced Professional photography assignments around Products, People, Fashion, Glamour including advertising and editorials.",
      "In addition to placing a priority on professionalism, he is also easygoing with a sense of humor & welcomes that clients enjoy the experience as well as receiving top-quality work.",
      "A diverse range of clients such as DSTV/Multichoice, Nokia, Smirnoff, Maltina, Dulux Paint, Lafarge Cement, Snapp, Schweppes, Ribena, Swift Networks Limited, Lead way Assurance, Airtel Nigeria, Peak Milk, Three Crowns Milk, Lucozade Nigeria, Gionee Mobile, Grand Oak Limited, Paga Nigeria, Indomie, Travelstart, etc. When it comes to award-winning advertising and product photography that meets the goals of the client, only Temitayo can deliver the excellence these leading brands demand.",
      "Temitayo is currently working as a creative director and lead photographer at Belvaphilips Imagery.",
    ],
    image: "/assets/team/Onadeko.png",
    imagePosition: "left" as const,
  },
  {
    name: "ONADEKO OMOLARA MARY",
    title: "HUMAN RESOURCE MANAGER",
    bio: [
      "Omolara Onadeko, M. is a seasoned entrepreneur and dynamic professional with a proven track record of success in Human Resources.",
      "She holds a degree in Marketing from Lagos State University and began her career at Multichoice Limited in 2012 as a Sales/Marketing Officer. Demonstrating a strong aptitude for customer engagement and operational excellence, she transitioned to BeaufortBet in 2014 as a Customer Service Manager.",
      "In 2016, Omolara joined ZenithBet Limited as Head of Operations Manager , where she advanced through the ranks while further honing her expertise. Committed to continuous professional development, she expanded her skill set, becoming a certified Digital Marketer and Content Writer/Creator in 2020.",
      "Currently, she serves as a Strategic Human Resources Director at Belvaphilips Imagery, where she leverages her extensive experience in marketing, operations, and leadership to drive organizational growth and innovation.",
    ],
    image: "/assets/team/mary.png",
    imagePosition: "right" as const,
  },
  {
    name: "ADEBUNMI AKINTUNDE",
    title: "OPERATIONS MANAGER",
    bio: [
      "Adebunmi Akintunde is an Operations Executive at Belvaphilips. She joined the team in 2024 and has been involved in various operational tasks and adherence to non-disclosure agreements. Adebunmi has a background in Community Management, Graphics design, Business Analyst and Facility Management. She holds a Bachelor of Arts in English Language, obtained in 2019 from Obafemi Awolowo university ile-ife. Adebunmi resides in Lagos and has a strong professional background with experience in organizing events, creating communication campaigns, brand and client management.",
    ],
    image: "/assets/team/bunmi.png",
    imagePosition: "left" as const,
  },
  {
    name: "AKOREDE OLANREWAJU HADIRR",
    title: "ART DIRECTOR",
    bio: [
      "My name is Akorede Olanrewaju, a certified paper artist, Graphics designer and Art director. My life has been Paper, Pencil, Pen and Graphics with passion, creativity, and an unyielding love for art. From an early age, I found solace in the world of colors, shapes, and designs. Over the years, I have been able to build amazing sets, creatives, and craftsmen, bridging the gap between digital and tangible artistry. My projects often involve a fusion of handcrafted elements with modern design techniques, creating immersive and visually striking experiences.",
      "Art is ever-evolving, and so is my journey. I continue to challenge myself, exploring new materials, techniques, and creative expressions. Whether through my role as an Art Director, a craftsman, or a mentor, I remain committed to making art that not only captivates but also inspires.",
    ],
    image: "/assets/team/korede.png",
    imagePosition: "right" as const,
  },
  {
    name: "MARC DIKO",
    title: "VIDEOGRAPHER",
    bio: [
      "Marc is a passionate and driven individual with years of experience in videography and a background in Visual Effects. Committed to pushing the boundaries of visual storytelling, he constantly explores new creative possibilities. Beyond filmmaking, he enjoys playing basketball, working out, listening to music and drawing, always seeking new ways to expand his skills. Guided by the philosophy ‘Grow relentlessly, balance effortlessly,’ he strives for continuous improvement while maintaining harmony in all aspects of life.",
    ],
    image: "/assets/team/marc.png",
    imagePosition: "left" as const,
  },
  {
    name: "Taiwo Olorunfunmi Adedoyin",
    title: "Client Support Officer",
    bio: [
      "My name is Olorunfunmi Taiwo Adedoyin. I'm in my mid-twenties, a vibrant lady from Ogun State, Nigeria. I love singing and dancing, listening to good music. Enjoy exploring new places and would one day love to travel and experience the world and meeting great people. A lover of God. I value kindness, compassion and personal growth.",
      "My goal is to make an infectious positive impact in the world. ",
      "Favorite quote; There is no enlightenment in shrinking so others can be comfortable around you.",
    ],
    image: "/assets/team/funmi.png",
    imagePosition: "right" as const,
  },
  {
    name: "Onadeko Oluwatobiloba",
    title: "CONTENT CREATOR",
    bio: [
      "Onadeko Oluwatobiloba is a woman in her 20’s with a quiet yet profound presence , navigating the complexities of life with introspection and thoughtfulness.Born in a close knit community, Tobi has always been more reserved. Growing up Tobi often felt like an observer of life, contemplating the bigger question about identity, purpose and direction. Tobi has spent the last few years navigating the complex journey of discovering her true calling which has lead her to the world of content creation. Tobi remains open to new experiences but does so at her own pace , valuing genuineness and personal integrity above all else.",
    ],
    image: "/assets/team/tobi.png",
    imagePosition: "left" as const,
  },
];

export default function TeamSection() {
  return (
    <section className="pt-[100px] ">
      <div className="container container mx-auto px-4 py-16">
        <motion.h2
          className="text-[82.83px] font-semibold mb-16 leading-[115%] text-[#1D1D1B] tracking-[-3px]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          MEET THE TEAM
        </motion.h2>

        <div>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              title={member.title}
              bio={member.bio}
              image={member.image}
              imagePosition={member.imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
