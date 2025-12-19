import Scene from '../components/three/Scene';
import SkillsScene from '../components/three/SkillScene';

export default function Test3D() {
  return (
    <main className="min-h-screen bg-gray-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* Interactive Cubes */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4">Interactive 3D Objects</h2>
          <p className="text-center text-gray-400 mb-8">
            Hover and click the cubes!
          </p>
          <div className="w-full h-[600px] border-2 border-blue-500 rounded-lg overflow-hidden">
            <Scene />
          </div>
        </section>

        {/* 3D Skills */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4">3D Skills Showcase</h2>
          <p className="text-center text-gray-400 mb-8">
            Drag to rotate and explore skills!
          </p>
          <div className="w-full h-[600px] border-2 border-purple-500 rounded-lg overflow-hidden">
            <SkillsScene />
          </div>
        </section>

      </div>
    </main>
  );
}