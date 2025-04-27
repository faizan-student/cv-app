let templateDesign = 0;  // Initially no template selected

// Define CV Template 1 as an example
const cvTemplate1 = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p style="text-align: left; font-size: 12px;">
            123 YOUR STREET <br>
            YOUR CITY, ST 12345 <br>
            <span style="color: #D84315; font-weight: bold;">(123) 456-7890</span> <br>
            <span style="color: #D84315; font-weight: bold;">NO_REPLY@EXAMPLE.COM</span>
        </p>

        <h1 style="border-bottom: 2px solid black; padding-bottom: 5px; font-weight: bold; text-align: left; margin-top: 50px;">YOUR NAME</h1>

        <h2 style="font-size: 14px; font-weight: bold;">SKILLS</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

        <h2 style="font-size: 14px; font-weight: bold;">EXPERIENCE</h2>
        <p><strong style="color: #D84315;">Company Name, Location - <i>Job Title</i></strong><br>MONTH 20XX - PRESENT</p>
        <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Aenean ac interdum mi. Sed in consequat mi.</li>
            <li>Sed pulvinar lacinia felis eu finibus.</li>
        </ul>

        <p><strong style="color: #D84315;">Company Name, Location - <i>Job Title</i></strong><br>MONTH 20XX - MONTH 20XX</p>
        <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Aenean ac interdum mi. Sed in consequat mi.</li>
        </ul>

        <h2 style="font-size: 14px; font-weight: bold;">EDUCATION</h2>
        <p><strong style="color: #D84315;">School Name, Location - <i>Degree</i></strong><br>MONTH 20XX - MONTH 20XX</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <h2 style="font-size: 14px; font-weight: bold;">AWARDS</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
`;

// Define CV Template 2 as an example
const cvTemplate2 = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 900px; margin: 0 auto; padding: 30px 50px;">
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
        <div style="flex-basis: 100%; text-align: left;">
            <h1 style="font-size: 32px; margin: 0; color: #333;">Jane Smith</h1>
            <p style="font-size: 16px; margin: 5px 0; color: #555;">Full Stack Developer | React & Node.js Expert</p>
            <p style="font-size: 14px; margin: 5px 0; color: #777;">📧 jane.smith@email.com | 📱 +1 234 567 890 | 🌐 janesmith.dev</p>
        </div>
    </header>

    <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; color: #0073e6;">About Me</h2>
        <p style="font-size: 14px; color: #333;">
            I'm a passionate full-stack developer with over 5 years of experience in building modern web applications. I specialize in JavaScript frameworks like React and Node.js, and I’m passionate about creating user-friendly, high-performance applications.
        </p>
    </section>

    <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; color: #0073e6;">Technical Skills</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 15px;">
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">React</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">Node.js</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">JavaScript</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">Express.js</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">MongoDB</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">Docker</span>
            <span style="background: #e3f2fd; padding: 8px 12px; border-radius: 4px; color: #0073e6; font-size: 14px;">Git</span>
        </div>
    </section>

    <section style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; color: #0073e6;">Work Experience</h2>
        <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16px; color: #333;">Senior Developer - Web Tech Solutions</h3>
            <p style="font-size: 14px; color: #555;">March 2019 - Present</p>
            <ul style="list-style: none; padding-left: 20px; margin: 0; font-size: 14px; color: #444;">
                <li>Developed and maintained web applications using React and Node.js.</li>
                <li>Collaborated with cross-functional teams to design and optimize APIs.</li>
                <li>Implemented state management and component-based architecture using Redux.</li>
            </ul>
        </div>
    </section>

    <footer style="text-align: center; font-size: 12px; color: #777;">
        <p>Career Campus Pro (CCP)</p>
    </footer>
</div>

`;

const cvTemplate3 = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; background-color: #f7f7f7; border-radius: 8px;">
    <header style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div style="flex-basis: 100%; text-align: left;">
            <h1 style="font-size: 30px; color: #333;">Emily Johnson</h1>
            <p style="font-size: 16px; margin: 5px 0; color: #666;">Backend Developer | Java, Spring Boot, Hibernate</p>
            <p style="font-size: 14px; margin: 5px 0; color: #888;">📧 emily.johnson@email.com | 📱 +1 234 567 890</p>
        </div>
    </header>

    <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #009688;">About Me</h2>
        <p style="font-size: 14px; color: #333;">
            A highly skilled backend developer with 6+ years of experience in developing scalable systems. Proficient in Java, Spring Boot, and building robust server-side applications.
        </p>
    </section>

    <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #009688;">Core Skills</h2>
        <ul style="list-style: none; padding-left: 20px; font-size: 14px; color: #333;">
            <li>Java, Spring Boot, Hibernate</li>
            <li>REST APIs, Microservices Architecture</li>
            <li>SQL, MongoDB</li>
            <li>CI/CD, Docker</li>
        </ul>
    </section>

    <section style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #009688;">Work Experience</h2>
        <div>
            <h3 style="font-size: 16px; color: #333;">Backend Developer - Tech Innovations</h3>
            <p style="font-size: 14px; color: #555;">Feb 2018 - Present</p>
            <ul style="list-style: none; padding-left: 20px; font-size: 14px; color: #333;">
                <li>Developed and optimized backend services using Java and Spring Boot.</li>
                <li>Worked with databases like PostgreSQL and MongoDB.</li>
                <li>Contributed to the migration of legacy systems to microservices architecture.</li>
            </ul>
        </div>
    </section>

    <footer style="text-align: center; font-size: 12px; color: #777;">
        <p>© 2025 Emily Johnson. All rights reserved.</p>
    </footer>
</div>
`;


const cvTemplate4 = `
<div style="font-family: Arial, sans-serif; color: #000; max-width: 1000px; margin: auto; padding: 20px;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
    <!-- Left Side -->
    <div style="width: 48%;">
      <h1 style="margin: 0; font-size: 36px; color: #111;">Your Name</h1>
      <p style="margin: 5px 0 20px 0; font-size: 14px; color: #555;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">EXPERIENCE</h3>
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Company, Location</strong> — <em>Job Title</em></p>
        <p style="margin: 0; font-size: 13px; color: #777;">MONTH 20XX - PRESENT</p>
        <p style="margin: 5px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Company, Location</strong> — <em>Job Title</em></p>
        <p style="margin: 0; font-size: 13px; color: #777;">MONTH 20XX - MONTH 20XX</p>
        <p style="margin: 5px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Company, Location</strong> — <em>Job Title</em></p>
        <p style="margin: 0; font-size: 13px; color: #777;">MONTH 20XX - MONTH 20XX</p>
        <p style="margin: 5px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
      </div>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">EDUCATION</h3>
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>School Name, Location</strong> — <em>Degree</em></p>
        <p style="margin: 0; font-size: 13px; color: #777;">MONTH 20XX - MONTH 20XX</p>
        <p style="margin: 5px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>School Name, Location</strong> — <em>Degree</em></p>
        <p style="margin: 0; font-size: 13px; color: #777;">MONTH 20XX - MONTH 20XX</p>
        <p style="margin: 5px 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh.</p>
      </div>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">PROJECTS</h3>
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Project Name</strong> — <em>Detail</em></p>
        <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>

    <!-- Right Side -->
    <div style="width: 48%;">
      <div style="text-align: right; margin-bottom: 20px;">
        <p style="margin: 0;">123 Your Street<br>Your City, ST 12345</p>
        <p style="margin: 5px 0;">(123) 456-7890<br><span style="font-weight: bold; color: #0074d9;">no.reply@example.com</span></p>
      </div>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">SKILLS</h3>
      <ul style="margin: 0 0 20px 20px; padding: 0; list-style-type: disc; font-size: 14px;">
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Consectetuer adipiscing elit.</li>
        <li>Sed diam nonummy nibh euismod tincidunt.</li>
        <li>Laoreet dolore magna aliquam erat volutpat.</li>
      </ul>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">AWARDS</h3>
      <ul style="margin: 0 0 20px 20px; padding: 0; list-style-type: square; font-size: 14px;">
        <li>Lorem ipsum dolor sit amet, Consectetuer adipiscing elit</li>
        <li>Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</li>
        <li>Lorem ipsum dolor sit amet, Consectetuer adipiscing elit</li>
        <li>Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</li>
      </ul>

      <h3 style="color: #0074d9; border-bottom: 1px solid #ddd; padding-bottom: 5px;">LANGUAGES</h3>
      <ul style="margin: 0 0 20px 20px; padding: 0; list-style-type: circle; font-size: 14px;">
        <li>English - Fluent</li>
        <li>Hindi - Native</li>
        <li>Spanish - Basic</li>
      </ul>
    </div>
  </div>
</div>
`;


const cvTemplate5 = `
<div style="font-family: Arial, sans-serif; max-width: 900px; margin: auto; padding: 20px;">
  <div style="display: flex; justify-content: space-between;">
    <div>
      <h1 style="margin: 0; font-size: 36px; line-height: 1.2;">Your<br>Name</h1>
      <p style="color: #f26c4f; font-weight: bold; margin: 5px 0 20px 0; font-size: 16px;">Creative Director</p>
    </div>
    <div style="text-align: right; font-size: 14px; line-height: 1.6;">
      <p style="margin: 0;">123 Your Street<br>Your City, ST 12345</p>
      <p style="margin: 0; color: #0074d9;">123.456.7890</p>
      <p style="margin: 0; color: #f26c4f;">no_reply@example.com</p>
    </div>
  </div>

  <div style="display: flex; margin-top: 30px;">
    <!-- Left Sidebar -->
    <div style="width: 30%; padding-right: 25px; border-right: 1px solid #ccc;">
      <h3 style="margin-bottom: 10px; color: #333;">SKILLS</h3>
      <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi.</p>

      <h3 style="margin-top: 30px; margin-bottom: 10px; color: #333;">AWARDS</h3>
      <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lacinia felis eu finibus.</p>
    </div>

    <!-- Right Content -->
    <div style="width: 70%; padding-left: 25px;">
      <!-- Experience Section -->
      <h3 style="border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 0; color: #333;">EXPERIENCE</h3>

      <div style="margin-bottom: 20px;">
        <p style="margin: 0;"><strong>Company Name / Job Title</strong><br>
        <span style="font-size: 13px;">MONTH 20XX - PRESENT, LOCATION</span></p>
        <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in consequat mi.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="margin: 0;"><strong>Company Name / Job Title</strong><br>
        <span style="font-size: 13px;">MONTH 20XX - MONTH 20XX, LOCATION</span></p>
        <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac interdum nisi.</p>
      </div>

      <div style="margin-bottom: 30px;">
        <p style="margin: 0;"><strong>Company Name / Job Title</strong><br>
        <span style="font-size: 13px;">MONTH 20XX - MONTH 20XX, LOCATION</span></p>
        <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lacinia felis.</p>
      </div>

      <!-- Education Section -->
      <h3 style="border-bottom: 1px solid #000; padding-bottom: 5px; color: #333;">EDUCATION</h3>

      <div style="margin-bottom: 20px;">
        <p style="margin: 0;"><strong>School Name / Degree</strong><br>
        <span style="font-size: 13px;">MONTH 20XX - MONTH 20XX, LOCATION</span></p>
        <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh.</p>
      </div>

      <div>
        <p style="margin: 0;"><strong>School Name / Degree</strong><br>
        <span style="font-size: 13px;">MONTH 20XX - MONTH 20XX, LOCATION</span></p>
        <p style="font-size: 14px; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod tincidunt ut laoreet.</p>
      </div>
    </div>
  </div>
</div>
`


const cvTemplate6 = `
<div style="max-width: 960px; margin: auto; display: flex; font-family: 'Segoe UI', sans-serif; font-size: 14px; color: #000; padding: 40px 20px;">
  <!-- Left Sidebar -->
  <div style="width: 30%; padding-right: 30px; border-right: 2px solid #000;">
    <h1 style="font-size: 28px; margin-bottom: 5px;">Your Name</h1>
    <p style="font-weight: bold; color: #f57c00; margin-top: 0;">Creative Director</p>
    <hr>

    <h3>Contact</h3>
    <p style="line-height: 1.5;">
      📞 123-456-7890<br>
      📧 your.email@example.com<br>
      🌐 www.yourportfolio.com
    </p>

    <h3>Skills</h3>
    <ul style="padding-left: 20px;">
      <li>Creative Direction</li>
      <li>Branding</li>
      <li>UI/UX Design</li>
      <li>Adobe Suite</li>
      <li>Team Leadership</li>
    </ul>

    <h3>Languages</h3>
    <ul style="padding-left: 20px;">
      <li>English (Fluent)</li>
      <li>Hindi (Native)</li>
    </ul>

    <h3>Certifications</h3>
    <ul style="padding-left: 20px;">
      <li>UX Design - Coursera</li>
      <li>Creative Strategy - Adobe</li>
    </ul>
  </div>

  <!-- Right Content -->
  <div style="width: 70%; padding-left: 30px;">
    <!-- Profile Summary -->
    <h2 style="border-bottom: 1px solid #000;">Profile</h2>
    <p>
      Highly creative and detail-oriented Creative Director with 8+ years of experience leading design projects, shaping brand identities, and delivering compelling digital experiences. Proven record of managing teams and producing high-impact visual solutions.
    </p>

    <!-- Work Experience -->
    <h2 style="border-bottom: 1px solid #000; margin-top: 30px;">Work Experience</h2>

    <div style="margin-bottom: 20px;">
      <strong>Creative Director — ABC Studio</strong><br>
      <em>2020 – Present | Mumbai, India</em>
      <ul style="padding-left: 18px;">
        <li>Led a team of 10 designers and delivered branding for 20+ global clients.</li>
        <li>Improved campaign engagement by 35% via innovative design strategies.</li>
        <li>Oversaw all visual content creation from concept to final delivery.</li>
      </ul>
    </div>

    <div style="margin-bottom: 20px;">
      <strong>Senior Designer — XYZ Agency</strong><br>
      <em>2016 – 2020 | Bangalore, India</em>
      <ul style="padding-left: 18px;">
        <li>Designed UI/UX for 10+ mobile/web apps and won 2 design awards.</li>
        <li>Trained junior designers and set up internal style guides.</li>
      </ul>
    </div>

    <!-- Education -->
    <h2 style="border-bottom: 1px solid #000; margin-top: 30px;">Education</h2>
    <p><strong>Bachelor of Design</strong><br>
    National Institute of Design, Ahmedabad<br>
    2012 – 2016</p>

    <p><strong>Diploma in Digital Marketing</strong><br>
    IIDE, Mumbai – 2017</p>

    <!-- Awards -->
    <h2 style="border-bottom: 1px solid #000; margin-top: 30px;">Awards</h2>
    <ul style="padding-left: 20px;">
      <li>Best Creative Director – India Design Awards 2022</li>
      <li>Top 10 UI Designers – Behance India 2021</li>
    </ul>
  </div>
</div>


`


// Add Event Listener to Template Preview Images
document.querySelectorAll('.template-preview img').forEach((img, index) => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('templateModal');
    const modalImage = document.getElementById('modalImage');

    // Display the modal with the corresponding template image
    modal.classList.add('show');
    modalImage.src = img.src;  // Display the clicked template image

    // Set templateDesign value based on clicked template
    templateDesign = index + 1;
  });
});

// Close Modal when clicking outside the modal
document.getElementById('templateModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('show');
  }
});

// Customize button click event to add the template to the document area
document.querySelector('.customize-btn').addEventListener('click', () => {
  // Check templateDesign value and insert the appropriate template
  if (templateDesign === 1) {
    document.querySelector('.document-area').innerHTML = cvTemplate1;
  } else if (templateDesign === 2) {
    document.querySelector('.document-area').innerHTML = cvTemplate2;
  } else if (templateDesign === 3) {
    document.querySelector('.document-area').innerHTML = cvTemplate3;
  } else if (templateDesign === 4) {
    document.querySelector('.document-area').innerHTML = cvTemplate4;
  } else if (templateDesign === 5) {
    document.querySelector('.document-area').innerHTML = cvTemplate5;
  } else if (templateDesign === 6) {
    document.querySelector('.document-area').innerHTML = cvTemplate6;
  }

  // Close the modal after applying the template
  document.getElementById('templateModal').classList.remove('show');
});

