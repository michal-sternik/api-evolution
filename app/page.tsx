import ImageCarousel from "@/components/ImageCarousel";
import Title from "@/components/Title";
import Section from "@/components/Section";
import NavBar from "@/components/NavBar";
import { Header } from "@/components/Header";
import { Content } from "@/components/Content";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <div className="flex flex-col mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <Title text="API Evolution: GraphQL vs REST (and Beyond)" />

        <div className="flex my-16 max-w-xl ">
          <Content miniHeader="At a Glance">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim
            mi, mollis at velit ut, feugiat sollicitudin felis. Etiam ac blandit
            tellus, eget fringilla metus. Fusce vel libero quis leo efficitur
            vulputate. In tristique dignissim mauris, ac fringilla velit
            vestibulum et. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. In hac habitasse platea
            dictumst. Etiam commodo mi id sapien finibus, eget laoreet lacus
            sollicitudin. Etiam suscipit elementum congue.
          </Content>
        </div>

        <ImageCarousel
          images={[
            { src: "/images/image1.jpg", alt: "Image 1 description" },
            { src: "/images/image2.jpg", alt: "Image 2 description" },
            { src: "/images/image3.jpg", alt: "Image 3 description" },
          ]}
        />

        <div className="my-16 max-w-2xl mx-auto">
          <Content>
            Duis ultricies, <u>eros id porta volutpat, massa</u> dolor ornare
            arcu <strong>tristique</strong> tellus odio aliquet lorem.{" "}
            <em>Phasellus ut eros id</em> ligula luctus{" "}
            <strong>vulputate ac sed neque</strong>. Donec volutpat massa diam,
            a convallis nunc ornare ut. Suspendisse vitae neque a purus
            consequat ultrices. Aenean ut nunc purus. Proin mattis volutpat
            hendrerit. <strong>Suspendisse</strong> id cursus enim.{" "}
            <strong>
              <u>Maecenas tincidunt eu lectus ut congue.</u>
            </strong>{" "}
            Duis imperdiet sit amet tellus eget fringilla. Sed convallis nulla
            metus, dignissim hendrerit orci lobortis et. Nulla fermentum
            porttitor magna,{" "}
            <strong>vitae vestibulum nisl dignissim sit</strong> amet.
          </Content>

          {/* 1st example SECTION */}

          <Section
            header={<Header>Bio-Integrated Travel : Plant to Earn</Header>}
          >
            <Content>
              Cras a placerat augue, a rhoncus sapien. In{" "}
              <strong>venenatis lorem</strong> sed risus scelerisque malesuada.
              Donec vel <u>condimentum leo, eget dignissim quam</u>. Maecenas
              sagittis <em>ultrices molestie</em>. Phasellus eros tellus,
              gravida sit amet ultricies et, euismod quis arcu. Vestibulum ut
              augue in lacus <strong>posuere tempus</strong>. Nullam mollis in
              velit id imperdiet. Fusce cursus, leo non{" "}
              <em>fermentum vulputate</em>, velit lectus accumsan purus, quis
              fringilla augue lorem quis libero.{" "}
              <u>Donec luctus dictum purus</u>, vel porttitor massa cursus nec.
              Donec sapien enim, <strong>porta in ultrices</strong> vel,
              vestibulum in nunc.
            </Content>

            <Content miniHeader="Donec luctus dictum">
              Quisque molestie lacus dui,{" "}
              <strong>mattis lobortis sapien</strong> tempus eu. Maecenas at
              nunc libero. Praesent luctus risus nisi, id rutrum metus suscipit
              id. Vivamus egestas, massa eget <u>semper porttitor</u>, urna
              lacus pulvinar turpis, ac volutpat eros mi sit amet dolor. Fusce
              magna mauris, rhoncus et urna in,{" "}
              <strong>molestie euismod</strong> purus.{" "}
              <em>Phasellus convallis turpis</em> quis ex ultricies sagittis.
            </Content>

            <Content>
              Praesent a magna a <u>purus facilisis tristique</u> eu eu odio.
              Curabitur lacus nulla, congue vel lacus eu,{" "}
              <strong>fermentum bibendum sem</strong>. Aliquam felis lectus,
              porta at ornare sit amet, placerat id nisl. Vivamus laoreet ex at{" "}
              <em>vulputate mattis</em>. Suspendisse in sem nisi.{" "}
              <u>Aliquam erat volutpat</u>. Maecenas ut libero vel lorem
              volutpat rutrum vel quis tortor. Sed orci ante, tristique eu enim
              eu, <strong>iaculis viverra ligula</strong>. Morbi in viverra
              risus, <em>eget vestibulum velit</em>.
            </Content>

            <Content>
              Curabitur purus neque, viverra at pharetra a,{" "}
              <strong>accumsan eu felis</strong>. Vivamus at dui blandit dui
              pretium efficitur eget vitae neque.{" "}
              <u>Nulla quis congue turpis</u>. Vestibulum tellus ex, mollis eu
              metus eu, lacinia placerat ligula. <em>Sed luctus sapien</em> eu
              pharetra dictum. Pellentesque eu porta leo. Nullam consequat dui
              ut nulla pellentesque luctus. Sed sollicitudin,{" "}
              <strong>dui varius pulvinar tristique</strong>, lorem tortor
              tristique dolor, quis maximus ante enim eu orci. Vivamus
              condimentum nulla non{" "}
              <u>
                <strong>tincidunt finibus</strong>
              </u>
              . Cras lectus justo, <em>mattis at tellus at</em>, feugiat tempus
              augue.
            </Content>
          </Section>

          {/* 2st example SECTION */}

          <Section
            header={
              <Header>Global Nomadism 2.0: Stateless Living by Design</Header>
            }
          >
            <Content>
              Cras a placerat augue, a rhoncus sapien. In{" "}
              <strong>venenatis lorem</strong> sed risus scelerisque malesuada.
              Donec vel <u>condimentum leo, eget dignissim quam</u>. Maecenas
              sagittis <em>ultrices molestie</em>. Phasellus eros tellus,
              gravida sit amet ultricies et, euismod quis arcu. Vestibulum ut
              augue in lacus <strong>posuere tempus</strong>. Nullam mollis in
              velit id imperdiet. Fusce cursus, leo non{" "}
              <em>fermentum vulputate</em>, velit lectus accumsan purus, quis
              fringilla augue lorem quis libero.{" "}
              <u>Donec luctus dictum purus</u>, vel porttitor massa cursus nec.
              Donec sapien enim, <strong>porta in ultrices</strong> vel,
              vestibulum in nunc.
            </Content>

            <Content miniHeader="Pellentesque eu porta">
              Quisque molestie lacus dui,{" "}
              <strong>mattis lobortis sapien</strong> tempus eu. Maecenas at
              nunc libero. Praesent luctus risus nisi, id rutrum metus suscipit
              id. Vivamus egestas, massa eget <u>semper porttitor</u>, urna
              lacus pulvinar turpis, ac volutpat eros mi sit amet dolor. Fusce
              magna mauris, rhoncus et urna in,{" "}
              <strong>molestie euismod</strong> purus.{" "}
              <em>Phasellus convallis turpis</em> quis ex ultricies sagittis.
            </Content>

            <Content>
              Curabitur purus neque, viverra at pharetra a,{" "}
              <strong>accumsan eu felis</strong>. Vivamus at dui blandit dui
              pretium efficitur eget vitae neque.{" "}
              <u>Nulla quis congue turpis</u>. Vestibulum tellus ex, mollis eu
              metus eu, lacinia placerat ligula. <em>Sed luctus sapien</em> eu
              pharetra dictum. Pellentesque eu porta leo. Nullam consequat dui
              ut nulla pellentesque luctus. Sed sollicitudin,{" "}
              <strong>dui varius pulvinar tristique</strong>, lorem tortor
              tristique dolor, quis maximus ante enim eu orci. Vivamus
              condimentum nulla non{" "}
              <u>
                <strong>tincidunt finibus</strong>
              </u>
              . Cras lectus justo, <em>mattis at tellus at</em>, feugiat tempus
              augue.
            </Content>
          </Section>
        </div>
      </div>
    </main>
  );
}
