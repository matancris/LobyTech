import { useEffect, useState } from "react";
import { AppCard } from "./AppCard";
import { AppLogo } from "./AppLogo";
import { AppWeather } from "./AppWeather";
import { AppLocation } from "./AppLocation";
import { AppClock } from "./AppClock";
import { MediaCmpContainer } from "../../lobby/cmps/MediaCmpContainer";
import { ManagerMsgsContainer } from "../../lobby/cmps/ManagerMsgsContainer";
import { NewsFlashes } from "../../lobby/cmps/NewsFlashes";
import { LayoutConfig, LayoutComponentType, LayoutSection } from "../../../types/Layout";
import { layoutService } from "../services/layout.service";
import { useStore } from "../../../store/useStore";

interface Props {
    layoutId?: string;
}

const componentMap: Record<LayoutComponentType, React.FC<any>> = {
    AppWeather: AppWeather,
    AppLocation: AppLocation,
    AppClock: AppClock,
    AppLogo: AppLogo,
    MediaVideo: (props) => <MediaCmpContainer mediaType="video" {...props} />,
    MediaImage: (props) => <MediaCmpContainer mediaType="image" {...props} />,
    ManagerMsgs: ManagerMsgsContainer,
    NewsFlashes: NewsFlashes,
    AppText: (props) => <h1 className="app-text">{props.text}</h1>
};

export const AppLayout = ({ layoutId = 'default' }: Props) => {
    const [layout, setLayout] = useState<LayoutConfig | null>(null);
    const managerMsgs = useStore((state) => state.managerMsgs);


    const defaultLayout: LayoutConfig = {
        id: 'default',
        name: 'Default Layout',
        type: 'default',
        sections: {
            top: [
                { id: 'logo1', component: 'AppLogo' },
                { id: 'weather1', component: 'AppWeather' },
                { id: 'location1', component: 'AppLocation' },
                { id: 'clock1', component: 'AppClock' },
                { id: 'logo2', component: 'AppLogo' }
            ],
            left: [
                { id: 'video1', component: 'MediaVideo', props: { id: 'lobby-ad-preview' } }
            ],
            right: [
                { id: 'msgs1', component: 'ManagerMsgs', props: { managerMsgs: managerMsgs } },
                { id: 'image1', component: 'MediaImage', props: { id: 'main-page-preview' } }
            ],
            bottom: [
                { id: 'news1', component: 'NewsFlashes' }
            ]
        }
    };

    useEffect(() => {
        const loadLayout = async () => {
            console.log('Loading layout with ID:', layoutId);
            try {
                if (layoutId === 'default') {
                    console.log('Using default layout');
                    setLayout(defaultLayout);
                    return;
                }

                const layoutData = await layoutService.getLayoutById(layoutId);
                if (!layoutData) {
                    console.log('No layout found, using default');
                    setLayout(defaultLayout);
                } else {
                    setLayout(layoutData);
                }
            } catch (error) {
                console.error('Failed to load layout:', error);
                setLayout(defaultLayout);
            }
        };

        loadLayout();
    }, [layoutId, managerMsgs]);

    const renderComponent = (section: LayoutSection) => {
        const Component = componentMap[section.component];
        return Component ? <Component key={section.id} {...section.props} /> : null;
    };

    if (!layout) {
        console.log('Layout is null, rendering nothing');
        return null;
    }


    return (
        <section className='app-layout'>
            <div className={`layout-${layout.type}`}>
                <div className="top-section">
                    {layout.sections.top.map(renderComponent)}
                </div>
                <div className="main-left-section">
                    {layout.sections.left.map(renderComponent)}
                </div>
                <div className="main-right-section">
                    {layout.sections.right.map((section) => (
                        <AppCard key={section.id}>
                            {renderComponent({ ...section, id: `card-${section.id}` })}
                        </AppCard>
                    ))}
                </div>
                <div className="bottom-section">
                    {layout.sections.bottom.map(renderComponent)}
                </div>
            </div>
        </section>
    );
};
