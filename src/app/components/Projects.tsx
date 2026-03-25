import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'MoodBeats - Multimodal Music Recommendation',
    description: 'Research-based project trained with different ML models (CNN, RNN combination) using Python libraries for mood detection. Developed web application using Python Flask with MySQL database for personalized music recommendations.',
    image: 'https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3NDMzNjEzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Python', 'Flask', 'MySQL', 'CNN', 'RNN', 'Neural Networks'],
    github: 'https://github.com/vishaltaskar16/MoodBeats',
    demo: null,
  },
  {
    title: 'Life Guard - Personal Safety Application',
    description: 'Mobile app with comprehensive safety features including SOS alert, AR navigation, auto check-in, and live location sharing. Includes emergency contact management and real-time safety monitoring for enhanced personal security.',
    image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzQzNzQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AR Navigation', 'Real-time'],
    github: 'https://github.com/vishaltaskar16/Life-Guard-Safty-App',
    demo: null,
  },
  {
    title: 'City Street Mart - Grocery Application',
    description: 'Web-based marketplace for browsing, buying, and managing grocery products online from local vendors. Complete e-commerce solution with user-friendly interface and vendor management system.',
    image: 'https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzQ0MjAwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['PHP', 'Bootstrap', 'MySQL', 'E-commerce'],
    github: 'https://github.com/vishaltaskar16/Online-Street-Market',
    demo: null,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          A showcase of my work in Machine Learning, Full Stack Development, and Mobile Applications
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                {project.demo && (
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">Want to see more of my work?</p>
          <Button asChild>
            <a 
              href="https://github.com/vishaltaskar16" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Visit My GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}