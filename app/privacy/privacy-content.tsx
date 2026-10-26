import type { ReactNode } from "react";

type PrivacySection = {
  number: string;
  heading: string;
  content: ReactNode;
};

const Paragraph = ({ children }: { children: ReactNode }) => <p>{children}</p>;

const BulletList = ({ items }: { items: string[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Definition = ({ children }: { children: ReactNode }) => <p>{children}</p>;

export const privacySections: PrivacySection[] = [
  {
    number: "01",
    heading: "ABOUT THIS POLICY",
    content: (
      <>
        <Paragraph>
          This Privacy Policy (“Policy”) sets out how TURO BCN S.L. (“Turó”, “we”, “our”, “us”),
          operator of the Turó platform, collects, processes, stores, uses, protects, shares, and
          transfers the Personal Data that you (“User”, “you”, “your”) provide when you visit our
          website, use our App, and/or use our Services.
        </Paragraph>
        <Paragraph>
          By using, browsing, accessing, or availing any services from the App or Website you agree
          to be bound by the terms of this Policy and consent to the collection and use of your
          personal information in accordance with it.
        </Paragraph>
        <Paragraph>For any matters related to this Policy, you may contact us at:</Paragraph>
        <div className="privacyContact">
          <Paragraph>
            Email: <a href="mailto:info@clubturo.com">info@clubturo.com</a>
          </Paragraph>
          <Paragraph>
            Telephone: <a href="tel:+34600956056">+34 600 956 056</a>
          </Paragraph>
          <Paragraph>Address: Calle Amigó, 74, Planta 1ª, Puerta 2, Barcelona (08021), Spain</Paragraph>
        </div>
      </>
    ),
  },
  {
    number: "02",
    heading: "DEFINITIONS",
    content: (
      <div className="privacyDefinitions">
        <Definition>
          “Biometric Data” means personal data resulting from specific technical processing
          relating to the physical, physiological, or behavioural characteristics of a natural
          person.
        </Definition>
        <Definition>
          “Data concerning health” means personal data related to the physical or mental health of
          a natural person.
        </Definition>
        <Definition>
          “Data Controller” means the natural or legal person which, alone or jointly with others,
          determines the purposes and means of the processing of personal data.
        </Definition>
        <Definition>
          “Genetic Data” means personal data relating to the inherited or acquired genetic
          characteristics of a natural person.
        </Definition>
        <Definition>
          “Personal Data” means any information relating to an identified or identifiable natural
          person.
        </Definition>
        <Definition>
          “Process(ing)” means any operation or set of operations performed on personal data,
          whether by automated means or otherwise, including collection, recording, storage, use,
          disclosure, or destruction.
        </Definition>
      </div>
    ),
  },
  {
    number: "03",
    heading: "TYPE OF PERSONAL DATA COLLECTED",
    content: (
      <>
        <Paragraph>We may collect the following categories of data:</Paragraph>
        <div className="privacyDefinitions">
          <Definition>
            Identity data: name, gender, age, date of birth, email address, profile photo, phone
            number, username.
          </Definition>
          <Definition>
            Account and authentication data: hashed passwords, authentication provider information
            (e.g., Apple), session identifiers, refresh tokens, token expiry data, and device-local
            cached authentication information.
          </Definition>
          <Definition>
            Network and connections data: accounts, hashtags, and groups you interact with; contact
            information if you choose to upload it from a device.
          </Definition>
          <Definition>
            Activity data: physical characteristics, fitness goals, dietary preferences, calorie
            and macronutrient intake, activity type, timestamps, duration, distance, calories
            burned, heart rate statistics, route information (GeoJSON), and health conditions. May
            include Data concerning health, Genetic Data, and/or Biometric Data.
          </Definition>
          <Definition>
            Geolocation data: precise geolocation coordinates (latitude and longitude), altitude,
            accuracy indicators, speed, route snapshots, and GPS timestamps.
          </Definition>
          <Definition>Payment data: bank account details, payment or debit/credit card information.</Definition>
          <Definition>
            Technical data: IP address, cellular carrier, device ID, advertising ID, operating
            system, language, app version, and debug logs.
          </Definition>
          <Definition>
            Behaviour data: interactions with core functionalities, usage time, first and last
            access, and completion of predefined actions. In the App, this data is collected
            exclusively through internal technical means and is not used for advertising or
            profiling purposes.
          </Definition>
          <Definition>
            Cookie data (Website only): information collected through cookies and similar
            technologies, in accordance with the applicable Cookie Policy.
          </Definition>
          <Definition>Social media data: data from voluntarily linked Instagram or X accounts.</Definition>
          <Definition>
            Optional data: preferred trainers, previous workout history, fitness goals, dietary
            preferences, health conditions, and device health data.
          </Definition>
        </div>
      </>
    ),
  },
  {
    number: "04",
    heading: "DATA COLLECTION",
    content: (
      <>
        <Paragraph>We collect Personal Data when:</Paragraph>
        <BulletList
          items={[
            "You create an account on the App and provide identity data",
            "You use our Services, activity data and technical data are collected to ensure service reliability",
            "You choose to share your data with third-party applications via API",
            "You submit an inquiry through the contact form on the Website",
            "Data is stored temporarily on device for offline access or local caching",
          ]}
        />
        <Paragraph>
          You may withdraw your consent to Turó’s use of your Personal Data at any time by
          adjusting your preferences in the App’s Settings, disconnecting optional integrations,
          or by emailing <a href="mailto:support@clubturo.com">support@clubturo.com</a>. Once
          consent is withdrawn, certain features that rely on that data may no longer be available.
        </Paragraph>
      </>
    ),
  },
  {
    number: "05",
    heading: "USE OF YOUR PERSONAL DATA",
    content: (
      <>
        <Paragraph>We use your Personal Data to:</Paragraph>
        <BulletList
          items={[
            "Create and provide access to the App, Website, and Services",
            "Undertake verification of the User",
            "Develop, deliver, and improve the Services",
            "Personalise and enhance User experience",
            "Inform Users about new products, services, offers, and events",
            "Send promotional and marketing offers (with consent)",
            "Answer questions and handle User complaints",
            "Undertake and perform contractual obligations",
            "Detect, prevent, and address technical and security issues",
            "Detect or investigate fraud, abuse, illegal use, or violations of our Terms",
            "Ensure compliance with applicable laws",
            "Conduct internal analytical and research activities",
          ]}
        />
        <Paragraph>
          Turó does not use sensitive categories of Personal Data: including health data, fitness
          data, biometric data, genetic data, or precise geolocation data for targeted advertising,
          marketing communications, profiling, or sale to third parties.
        </Paragraph>
      </>
    ),
  },
  {
    number: "06",
    heading: "LEGAL BASIS FOR PROCESSING",
    content: (
      <>
        <Paragraph>
          Contract performance: We process your Personal Data based on our Terms of Use to provide,
          maintain, and support the Services, including creating and managing your user account.
          This does not include special categories of personal data (e.g., health data), which are
          only processed with your explicit consent.
        </Paragraph>
        <Paragraph>
          Explicit consent: Certain categories of Personal Data such as marketing preferences and
          personalised advertising are processed only based on your explicit consent. You may
          withdraw consent at any time without affecting the lawfulness of prior processing.
        </Paragraph>
        <Paragraph>
          Legitimate interests: We may process your Personal Data to improve our Services, provide
          customer support, or adjust software functionality, ensuring your fundamental rights and
          freedoms are not overridden.
        </Paragraph>
        <Paragraph>
          Legal obligation: We may process your Personal Data to comply with legal obligations, for
          example, accounting, tax, or regulatory requirements.
        </Paragraph>
      </>
    ),
  },
  {
    number: "07",
    heading: "DISCLOSURE OF PERSONAL DATA",
    content: (
      <>
        <Paragraph>We may share your Personal Data with:</Paragraph>
        <BulletList
          items={[
            "Partners (fitness trainers, nutritionists, wellness providers, event hosts) for Services you explicitly consented to",
            "Third-party apps (Apple, Google, Azure, Mapbox) if you explicitly opt-in",
            "Service providers processing data on our behalf (payment processors, email distributors, analytics providers)",
            "Authorities where required by law, court order, or to prevent illegal activity",
            "Third-party targeted advertising providers (with opt-out available in App settings)",
            "Any third party where you have provided consent",
          ]}
        />
        <Paragraph>
          We may also transfer Personal Data in the event of a sale, reorganisation, spin-off,
          dissolution, or liquidation of our business.
        </Paragraph>
        <Paragraph>
          Turó enters into Data Processing Agreements (DPAs) with all service providers that process
          Personal Data on its behalf, requiring them to implement appropriate technical and
          organisational security measures.
        </Paragraph>
      </>
    ),
  },
  {
    number: "08",
    heading: "PROTECTION OF PERSONAL DATA",
    content: (
      <>
        <Paragraph>
          Children: None of the Services shall be provided to a child under the age of 14 unless
          specific consent is obtained from the holder of parental responsibility.
        </Paragraph>
        <Paragraph>
          Security: We use a variety of technical and organisational security measures, including
          encryption and authentication tools, to maintain the safety of your Personal Data.
        </Paragraph>
      </>
    ),
  },
  {
    number: "09",
    heading: "INTERNATIONAL TRANSFERS",
    content: (
      <>
        <Paragraph>
          As a general rule, Turó does not carry out international transfers of personal data. Where
          service providers or technological tools involve processing data outside the European
          Economic Area (EEA), we ensure that the appropriate safeguards under GDPR Articles 44–49
          are applied including Standard Contractual Clauses (SCCs) or adequacy decisions issued by
          the European Commission.
        </Paragraph>
        <Paragraph>
          International data transfers occur with the following entities, all certified under the
          EU–US Data Privacy Framework: Apple; Google LLC; Meta Platforms, Inc. (Instagram); X Corp.;
          Mapbox; Microsoft (Azure); and optional avatar/image hosting services.
        </Paragraph>
        <Paragraph>Turó’s servers are located within the EEA, specifically in Spain and India.</Paragraph>
      </>
    ),
  },
  {
    number: "10",
    heading: "RETENTION OF DATA",
    content: (
      <>
        <Paragraph>
          We will only retain your Personal Data for as long as your account is active or as
          required by applicable law. Following account closure, data is retained only as long as
          legally necessary.
        </Paragraph>
        <Paragraph>
          Upon an erasure request, Personal Data will be permanently deleted within 14 days unless
          retention is required by law.
        </Paragraph>
        <Paragraph>
          To determine the appropriate retention period, we consider the amount, nature, and
          sensitivity of the Personal Data, the purposes for which we process it, and applicable
          legal requirements.
        </Paragraph>
      </>
    ),
  },
  {
    number: "11",
    heading: "YOUR RIGHTS",
    content: (
      <>
        <Paragraph>
          Applicable privacy laws grant you the following rights over your Personal Data:
        </Paragraph>
        <div className="privacyDefinitions">
          <Definition>
            Right to confirmation and access: You may ask whether and where your Personal Data is
            being processed, and request a copy.
          </Definition>
          <Definition>
            Right to rectification: You may request correction of incomplete or inaccurate data.
          </Definition>
          <Definition>
            Right to erasure / right to be forgotten: You may request deletion of your Personal
            Data. All Personal Data linked to your account will be permanently deleted within 14
            days of your request.
          </Definition>
          <Definition>
            Right to withdraw consent: You may withdraw consent at any time. Withdrawal does not
            affect the lawfulness of prior processing.
          </Definition>
          <Definition>
            Right to restriction of processing: You may request that we restrict how we process
            your Personal Data in certain circumstances.
          </Definition>
          <Definition>
            Right to object: You may object to processing on grounds relating to your particular
            situation, including opting out of marketing communications.
          </Definition>
          <Definition>
            Right to data portability: You may receive an electronic copy of your Personal Data and
            request it be transmitted to another company.
          </Definition>
          <Definition>
            Right to lodge a complaint: If you believe our processing infringes applicable data
            protection laws, you may lodge a complaint with the Spanish Data Protection Authority
            (AEPD) at <a href="https://www.aepd.es/">www.aepd.es</a>.
          </Definition>
        </div>
        <Paragraph>
          To exercise any right, email us at{" "}
          <a href="mailto:support@clubturo.com">support@clubturo.com</a>.
        </Paragraph>
      </>
    ),
  },
  {
    number: "12",
    heading: "CHANGES TO THIS POLICY",
    content: (
      <Paragraph>
        Applicable law and our practices change over time. If we decide to update this Policy, we
        will post the changes on our App. If we materially change the way in which we process your
        Personal Data, we will provide you with prior notice, or where legally required, request
        your consent prior to implementing such changes.
      </Paragraph>
    ),
  },
];
