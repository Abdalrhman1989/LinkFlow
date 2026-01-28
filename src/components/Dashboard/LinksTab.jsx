import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FaTrash, FaGripVertical, FaChartSimple, FaCalendarDays, FaPlus, FaStore } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import LinkAppStore from './LinkAppStore';

// Combine icons for rendering lists
const AllIcons = { ...FaIcons, ...SiIcons };

const LinksTab = ({ links, setLinks, onAddLink, onDeleteLink }) => {
    const [showAppStore, setShowAppStore] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    // Form States
    const [url, setUrl] = useState('');
    const [label, setLabel] = useState('');

    const handleAppSelect = (app) => {
        setSelectedApp(app);
        setLabel(app.label); // Auto-fill label
        setUrl('');
        setShowAppStore(false);
    };

    const handleAdd = (e) => {
        e.preventDefault();

        const linkData = selectedApp ? {
            label: label, // Allow user to edit default label
            url: url,
            color: selectedApp.color,
            icon: selectedApp.icon,
            type: selectedApp.id
        } : {
            label: label,
            url: url,
            color: '#888888',
            icon: 'FaGlobe',
            type: 'custom'
        };

        onAddLink(linkData);

        // Reset
        setUrl('');
        setLabel('');
        setSelectedApp(null);
    };

    // Missing State
    const [editingScheduleId, setEditingScheduleId] = useState(null);

    // Missing Handlers
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(links);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Optimistic update
        setLinks(items);

        // Prepare payload for backend
        const updates = items.map((item, index) => ({
            id: item.id,
            order: index
        }));

        try {
            await axios.put('http://localhost:3000/api/links/reorder', { links: updates });
        } catch (error) {
            toast.error('Failed to save order');
            console.error(error);
        }
    };

    const handleUpdateSchedule = async (id, startDate, endDate) => {
        try {
            // Find existing link data to not overwrite
            const link = links.find(l => l.id === id);
            await axios.put(`http://localhost:3000/api/links/${id}`, {
                ...link,
                startDate,
                endDate
            });
            toast.success('Schedule updated');

            // Update local state
            setLinks(links.map(l => l.id === id ? { ...l, startDate, endDate } : l));
            setEditingScheduleId(null);
        } catch (error) {
            toast.error('Failed to update schedule');
        }
    };

    // ... (rest of the file logic for DnD remains the same, need to preserve it) ...

    return (
        <div className="space-y-8 animate-fade-in">
            {/* App Store Modal */}
            <LinkAppStore
                isOpen={showAppStore}
                onClose={() => setShowAppStore(false)}
                onSelectApp={handleAppSelect}
            />

            {/* Simple Stats or anything else here... */}
            {/* Same chart code as before if desired, or simplified */}

            {/* Add New Link Section */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-transparent section-shadow">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold dark:text-white text-gray-900">Add New Link</h3>
                    {!selectedApp && (
                        <button
                            onClick={() => setShowAppStore(true)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-lg shadow-indigo-500/30"
                        >
                            <FaStore /> Browse Link Apps
                        </button>
                    )}
                </div>

                {!selectedApp ? (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-black/20">
                        <p className="text-gray-500 mb-4">Choose from Spotify, Instagram, YouTube and 40+ more integrations.</p>
                        <button
                            onClick={() => setShowAppStore(true)}
                            className="mx-auto w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:scale-110 transition-all shadow-sm"
                        >
                            <FaPlus size={24} />
                        </button>
                        <div className="mt-4">
                            <button onClick={() => setSelectedApp({ label: 'Custom Link', icon: 'FaGlobe', color: '#888', placeholder: 'https://' })} className="text-sm text-gray-400 hover:text-indigo-500 underline">
                                Or add a custom link
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleAdd} className="animate-fade-in bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-100 dark:border-white/5">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold flex items-center gap-3 dark:text-white text-black text-lg">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md relative overflow-hidden" style={{ backgroundColor: selectedApp.color }}>
                                    {(() => {
                                        const Icon = AllIcons[selectedApp.icon] || FaIcons.FaGlobe;
                                        return <Icon size={16} />;
                                    })()}
                                </div>
                                Add {selectedApp.label}
                            </h4>
                            <button
                                type="button"
                                onClick={() => setSelectedApp(null)}
                                className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Link Title</label>
                                <input
                                    placeholder="e.g. My Latest Song"
                                    className="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 p-3 rounded-xl outline-none focus:border-indigo-500 transition-colors dark:text-white font-medium"
                                    value={label}
                                    onChange={e => setLabel(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">URL</label>
                                <input
                                    placeholder={selectedApp.placeholder || "https://..."}
                                    className="w-full bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 p-3 rounded-xl outline-none focus:border-indigo-500 transition-colors dark:text-white font-medium"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.01]">
                                Add to Profile
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Links List */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-3"
                        >
                            {links.map((link, index) => (
                                <Draggable key={link.id} draggableId={String(link.id)} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="bg-white dark:bg-white/5 p-4 rounded-xl flex flex-col gap-3 group border border-gray-200 dark:border-transparent shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-grab active:cursor-grabbing">
                                                        <FaGripVertical />
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center" style={{ color: link.color }}>
                                                        {(() => {
                                                            const Icon = AllIcons[link.icon] || AllIcons.FaGlobe;
                                                            return <Icon />;
                                                        })()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{link.label}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{link.url}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => setEditingScheduleId(editingScheduleId === link.id ? null : link.id)}
                                                        className={`flex items-center gap-2 text-xs px-2 py-1 rounded-full ${link.startDate || link.endDate ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'text-gray-400 bg-gray-100 dark:bg-white/5'}`}
                                                    >
                                                        <FaCalendarDays />
                                                        <span className="hidden sm:inline">Schedule</span>
                                                    </button>

                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full">
                                                        <FaChartSimple />
                                                        <span>{link.clicks || 0}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => onDeleteLink(link.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Schedule Box */}
                                            {editingScheduleId === link.id && (
                                                <div className="pl-14 pt-2 border-t border-gray-200 dark:border-white/5 grid grid-cols-2 gap-4 animate-fade-in mt-2">
                                                    <div>
                                                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Start Date</label>
                                                        <input
                                                            type="datetime-local"
                                                            className="w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded p-2 text-xs dark:text-white"
                                                            defaultValue={link.startDate ? new Date(link.startDate).toISOString().slice(0, 16) : ''}
                                                            onChange={(e) => link.tempStart = e.target.value} // temp storage
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">End Date</label>
                                                        <input
                                                            type="datetime-local"
                                                            className="w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded p-2 text-xs dark:text-white"
                                                            defaultValue={link.endDate ? new Date(link.endDate).toISOString().slice(0, 16) : ''}
                                                            onChange={(e) => link.tempEnd = e.target.value}
                                                        />
                                                    </div>
                                                    <div className="col-span-2 flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setEditingScheduleId(null)}
                                                            className="text-xs text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={async (e) => {
                                                                // Use closest inputs
                                                                const inputs = e.target.closest('.grid').querySelectorAll('input');
                                                                const start = inputs[0].value;
                                                                const end = inputs[1].value;
                                                                await handleUpdateSchedule(link.id, start || null, end || null);
                                                            }}
                                                            className="text-xs bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 font-bold"
                                                        >
                                                            Save Schedule
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {links.length === 0 && <p className="text-center text-gray-500 mt-8">No links added yet.</p>}
        </div>
    );
};

export default LinksTab;
