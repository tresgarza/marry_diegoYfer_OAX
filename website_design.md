<website_design>
The wedding website follows a single-page design with smooth scrolling and anchor navigation. The layout begins with a hero section featuring an agave plantation background image, elegant serif typography for the couple's names "Fernanda & Diego", and prominent RSVP and calendar buttons. 

The page flows vertically through distinct sections: a timeline-style itinerary with location pins and map integration, a hotel recommendations grid, oval-styled gastronomy listings, beauty services cards, cultural recommendations in oval format, a masonry photo gallery with lightbox functionality, a full-width save-the-date banner, and an FAQ section. 

A sticky navigation menu provides quick access to all sections via anchor links. The footer contains language toggle (ES/EN), WhatsApp contact, and essential links. The design maintains consistent spacing, uses the specified color palette (deep agave green #2E4A2F, warm cream #F6F1E7, muted gold #8A7A39, charcoal gray #2C2C2C), and incorporates oval design elements throughout for visual cohesion.

The mobile-first responsive design ensures elegant presentation across all devices while maintaining the sophisticated Oaxacan aesthetic with ample white space and subtle gold accents.
</website_design>

<components>
<create_component>
  <file_path>src/components/WeddingHero.tsx</file_path>
  <design_instructions>
    Hero section with full-viewport height featuring a background image of agave plantation (with elegant placeholder if not provided). Overlay contains centered content with couple names "Fernanda & Diego" in large serif typography (Cormorant Garamond style), wedding date "12.09.26" in medium serif, and location "Oaxaca, México" in smaller sans-serif. Two prominent call-to-action buttons: "Confirmar asistencia (RSVP)" and "Agregar al calendario" with .ics file download functionality. Includes subtle dark overlay for text readability and maintains mobile-first responsive design. Color scheme uses warm cream text over agave green accents.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingNavigation.tsx</file_path>
  <design_instructions>
    Sticky navigation bar with clean, minimal design featuring the couple's names as logo on the left. Horizontal navigation menu with anchor links to all major sections (Itinerario, Hoteles, Gastronomía, Maquillaje, Cultura, Galería, RSVP). Mobile hamburger menu for smaller screens. Language toggle button (ES/EN) positioned prominently. Uses deep agave green background with warm cream text, subtle shadows for depth. Smooth scrolling behavior when clicking anchor links. Responsive design that collapses appropriately on mobile devices.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingItinerary.tsx</file_path>
  <design_instructions>
    Timeline-style itinerary section with vertical layout featuring four main events: religious ceremony, Oaxacan calenda, welcome cocktail, and reception. Each timeline item includes event name, venue, and time with minimal icons and connecting lines. Interactive map component showing two locations (Templo Santo Domingo and Salón Berniozábal) with custom pins. "Cómo llegar" buttons for each venue that open Google/Apple Maps based on device. Timeline uses oval bullet points consistent with site design language. Responsive layout that stacks properly on mobile. Bilingual content support with clean typography hierarchy using serif headings and sans-serif body text.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingHotels.tsx</file_path>
  <design_instructions>
    Hotel recommendations section with responsive grid layout (2 columns desktop, 1 column mobile). Six hotel cards each containing hotel name in serif typography, tap-to-call phone number with proper tel: links, and external "Página Web" button. Cards feature clean white backgrounds with subtle shadows, rounded corners, and hover effects. Phone numbers styled as buttons for mobile accessibility. External link buttons use muted gold accent color. Grid maintains consistent spacing and card heights. Bilingual support for section heading and button labels. Mobile-optimized touch targets for phone numbers.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingGastronomy.tsx</file_path>
  <design_instructions>
    Gastronomy section featuring three oval-shaped content areas as specified in the reference design style. Three categories: "Desayuno & Brunch", "Comida & Cena", and "Drinks & Cocteles". Each oval contains restaurant names in elegant typography with semicolon separation. Ovals use the deep agave green background with cream text, maintaining visual consistency with the overall design language. Responsive layout that stacks ovals vertically on mobile while maintaining their oval shape. Clean spacing between ovals and section title in serif typography. Bilingual content support for category names and section heading.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingBeautyServices.tsx</file_path>
  <design_instructions>
    Beauty services section with three service provider cards in a responsive grid layout. Each card includes business name in serif typography, tap-to-call phone number with tel: links, and Instagram handle as clickable link with proper external link styling. Cards maintain consistent styling with hotel cards but adapted for beauty service content. Instagram links styled with subtle social media icon and @handle format. Mobile-optimized for touch interactions with proper button sizing. Clean white card backgrounds with subtle shadows and rounded corners. Bilingual support for section heading and labels.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingCulturalRecs.tsx</file_path>
  <design_instructions>
    Cultural recommendations section with two oval-shaped content areas following the site's design language. "Oaxaca Centro" and "Oaxaca Tour" categories, each containing lists of cultural attractions and sites separated by semicolons. Ovals use consistent deep agave green background with cream text. Typography maintains hierarchy with serif category names and sans-serif attraction lists. Responsive design ensures ovals stack properly on mobile while preserving their shape and readability. Clean spacing and alignment with other oval sections throughout the site. Bilingual content support for category headings and attraction names.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingGallery.tsx</file_path>
  <design_instructions>
    Photo gallery section with masonry-style layout for 3-6 couple photos. Images feature soft rounded corners and subtle shadows for elegant presentation. Lightbox functionality allows full-screen viewing with navigation arrows and close button. Gallery uses lazy loading for performance optimization. Responsive masonry grid that adapts from 3 columns on desktop to 2 on tablet and 1 on mobile. Placeholder images with clear labeling for replacement (couple photos, engagement shots). Lightbox overlay includes image counter and smooth transitions. Gallery maintains aspect ratios while creating visually interesting masonry arrangement.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingSaveTheDate.tsx</file_path>
  <design_instructions>
    Full-width banner section featuring a black and white photograph of the couple as background. Large "SAVE THE DATE" text overlay in serif typography with the date "12.09.26" prominently displayed. Elegant text overlay with proper contrast ensuring readability. Responsive design that maintains image aspect ratio and text legibility across devices. Subtle dark overlay for text contrast if needed. Banner spans full container width with appropriate padding. Typography uses serif font family for formal, elegant appearance. Placeholder image slot clearly marked for replacement with actual couple photo.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingFAQ.tsx</file_path>
  <design_instructions>
    FAQ section with expandable accordion-style questions covering dress code, children policy, gifts/registry, transportation, and weather. Each FAQ item includes question in serif typography and expandable answer content. Smooth expand/collapse animations with proper ARIA accessibility attributes. Clean, minimal design with subtle borders and appropriate spacing. Mobile-friendly touch targets for expanding questions. Placeholder content that's warm and concise in tone, avoiding clichés. Bilingual support for both questions and answers. Uses consistent color scheme with muted gold accents for interactive elements.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingRSVP.tsx</file_path>
  <design_instructions>
    Comprehensive RSVP section with elegant form including fields for name, email, number of guests, attendance confirmation (Yes/No), dietary restrictions, transportation needs, and message. Form validation with clear error states and success confirmation. Submit functionality that sends to email and potentially saves to Google Sheets. Clean form styling with proper labels, placeholders, and accessibility attributes. Radio buttons and checkboxes styled to match site design. Success state with confirmation message and option to edit response. Loading states during submission. Mobile-optimized form layout with appropriate input types for different fields. Bilingual form labels and validation messages.
  </design_instructions>
</create_component>

<create_component>
  <file_path>src/components/WeddingFooter.tsx</file_path>
  <design_instructions>
    Footer section with language toggle (ES/EN), links to map locations, WhatsApp contact button for questions, and copyright notice. Clean, minimal design with proper social link styling. WhatsApp button opens chat with pre-filled message. Map links provide quick access to venue locations. Language toggle updates all site content dynamically. Footer uses deep agave green background with cream text for consistency. Responsive layout that stacks elements appropriately on mobile. Contact information and social links properly formatted with external link indicators. Copyright and essential legal information displayed clearly.
  </design_instructions>
</create_component>
</components>